const express = require('express');
const serveIndex = require('serve-index');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const app = express();
const PORT = 3000;

// Define the directory to serve
const directoryToServe = path.join('H:', 'GamesServer');

// Handle folder download requests
app.get('/download-folder', (req, res) => {
  const folderPath = req.query.path;
  if (!folderPath) {
    return res.status(400).send('No folder path provided');
  }

  const fullPath = path.join(directoryToServe, folderPath);
  
  // Ensure the path is within the allowed directory
  if (!fullPath.startsWith(directoryToServe)) {
    return res.status(403).send('Access denied');
  }

  // Check if the folder exists
  if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isDirectory()) {
    return res.status(404).send('Folder not found');
  }

  const archive = archiver('zip', {
    zlib: { level: 9 } // Maximum compression
  });

  // Set the headers
  res.attachment(`${path.basename(folderPath)}.zip`);

  // Pipe archive data to the response
  archive.pipe(res);

  // Add the folder to the archive
  archive.directory(fullPath, false);

  // Finalize the archive
  archive.finalize();
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
          const iconClass = isDirectory ? 'folder-icon' : 'file-icon';
          
          return `
            <li class="file-item">
              <a href="${itemPath}${isDirectory ? '/' : ''}" class="file-link">
                <div class="file-cover"></div>
                <div class="file-info">
                  <div class="file-name">${item.name}</div>
                  ${isDirectory ? `<button class="download-btn" onclick="handleDownload(event, '${itemPath}/')">
                    Download All
                  </button>` : ''}
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
