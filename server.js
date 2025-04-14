const express = require('express');
const serveIndex = require('serve-index');
const path = require('path');
const tar = require('tar'); // Add tar for streaming folder as an archive
const fs = require('fs');
const app = express();
const PORT = 3000;

// Define the directory to serve
const directoryToServe = path.join('H:', 'GamesServer');

// Serve static files from the directory
app.use(express.static(directoryToServe));

// Serve directory listings for the directory
app.use(serveIndex(directoryToServe, { icons: true }));

// Ensure middleware order: Move the custom middleware after serveIndex
app.use((req, res, next) => {
  if (req.url.endsWith('/')) {
    const originalSend = res.send;
    res.send = function (body) {
      if (typeof body === 'string') {
        // Inject "Download All" button into the directory listing
        body = body.replace(
          '</body>',
          `<style>
            .download-all-btn {
              color: white;
              background-color: red;
              border: none;
              padding: 5px 10px;
              margin-left: 10px;
              cursor: pointer;
            }
          </style>
          <script>
            document.addEventListener('DOMContentLoaded', () => {
              const folderLinks = document.querySelectorAll('li a[href$="/"]');
              folderLinks.forEach(folder => {
                const button = document.createElement('button');
                button.textContent = 'Download All';
                button.className = 'download-all-btn';
                button.onclick = () => {
                  const downloadFiles = (folderUrl) => {
                    fetch(folderUrl)
                      .then(res => res.text())
                      .then(html => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        const links = doc.querySelectorAll('li a[href]');
                        links.forEach(link => {
                          const href = link.getAttribute('href');
                          if (href.endsWith('/')) {
                            // Recursively download subfolder contents
                            downloadFiles(folderUrl + href);
                          } else {
                            // Download individual file
                            const a = document.createElement('a');
                            a.href = folderUrl + href;
                            a.download = href;
                            a.click();
                          }
                        });
                      });
                  };
                  downloadFiles(folder.href);
                };
                folder.parentElement.appendChild(button);
              });
            });
          </script></body>`
        );
      }
      originalSend.call(this, body);
    };
  }
  next();
});

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
