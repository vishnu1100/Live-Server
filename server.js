const express = require('express');
const serveIndex = require('serve-index');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const app = express();
const PORT = 3000;

// Define the directory to serve
const directoryToServe = path.join('H:', 'GamesServer');

// Handle file and folder download requests
app.get('/download-folder', (req, res) => {
  const filePath = req.query.path;
  if (!filePath) {
    return res.status(400).send('No path provided');
  }

  const fullPath = path.join(directoryToServe, filePath);
  
  // Ensure the path is within the allowed directory
  if (!fullPath.startsWith(directoryToServe)) {
    return res.status(403).send('Access denied');
  }

  // Check if the path exists
  if (!fs.existsSync(fullPath)) {
    return res.status(404).send('Path not found');
  }

  const stats = fs.statSync(fullPath);
  const isDirectory = stats.isDirectory();

  if (isDirectory) {
    // Calculate folder size first
    let totalSize = 0;
    const calculateSize = (dirPath) => {
      const items = fs.readdirSync(dirPath);
      for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const stats = fs.statSync(itemPath);
        if (stats.isDirectory()) {
          calculateSize(itemPath);
        } else {
          totalSize += stats.size;
        }
      }
    };
    calculateSize(fullPath);

    // Set headers for direct download with content length and force download
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(path.basename(filePath))}.zip`);
    res.setHeader('Content-Length', totalSize);
    res.setHeader('Content-Transfer-Encoding', 'binary');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    // Create a zip stream without compression
    const archive = archiver('zip', {
      store: true // Sets the compression method to STORE (no compression)
    });

    // Handle archive errors
    archive.on('error', (err) => {
      console.error('Archive error:', err);
      res.status(500).send('Error creating archive');
    });

    // Pipe archive data to the response
    archive.pipe(res);

    // Add the folder to the archive without compression
    archive.directory(fullPath, false);

    // Finalize the archive
    archive.finalize();
  } else {
    // For single file download
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(path.basename(filePath))}`);
    res.setHeader('Content-Length', stats.size);
    res.setHeader('Content-Transfer-Encoding', 'binary');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    // Stream the file directly
    fs.createReadStream(fullPath).pipe(res);
  }
});

// Serve static files from the directory
app.use(express.static(directoryToServe));

// Custom directory listing middleware
app.use((req, res, next) => {
  if (req.url.endsWith('/')) {
    const relativePath = req.url;
    const fullPath = path.join(directoryToServe, relativePath);
    
    fs.readdir(fullPath, { withFileTypes: true }, (err, items) => {
      if (err) {
        return next(err);
      }

      // Read the template file
      fs.readFile(path.join(__dirname, 'views', 'template.html'), 'utf8', (err, template) => {
        if (err) {
          return next(err);
        }

        // Generate file list HTML
        const fileListHtml = items.map(item => {
          const isDirectory = item.isDirectory();
          const itemPath = path.join(relativePath, item.name);
          const stats = fs.statSync(path.join(fullPath, item.name));
          const fileSize = (stats.size / (1024 * 1024)).toFixed(2);
          const iconClass = isDirectory ? 'folder-icon' : 'file-icon';
          
          return `
            <li class="file-item">
              <a href="${itemPath}${isDirectory ? '/' : ''}" class="file-link">
                <div class="file-cover"></div>
                <div class="file-info">
                  <div class="file-name">${item.name}</div>
                  <div class="file-size">${isDirectory ? '' : `${fileSize} MB`}</div>
                  <button class="download-btn" onclick="handleDownload(event, '${itemPath}${isDirectory ? '/' : ''}')">Download ${isDirectory ? 'Folder' : 'File'}</button>
                </div>
              </a>
            </li>`;
        }).join('');

        // Insert the file list into the template
        const html = template.replace(
          '<ul class="file-list">',
          `<ul class="file-list">${fileListHtml}`
        );

        res.send(html);
      });
    });
  } else {
    next();
  }
});

// Serve static files after the directory listing middleware
app.use(express.static(directoryToServe));

// Route to download the entire folder as a tar archive
app.get('/download', (req, res) => {
  res.setHeader('Content-Disposition', 'attachment; filename=GamesServer.tar');
  res.setHeader('Content-Type', 'application/x-tar');

  tar.c(
    {
      gzip: false, // No compression
      cwd: directoryToServe,
    },
    ['.'] // Include all files and subdirectories
  ).pipe(res).on('error', (err) => {
    console.error(err);
    res.status(500).send('Error creating tar archive');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`📁 File server running at http://localhost:${PORT}`);
});
