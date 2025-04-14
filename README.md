# Epic Games Style File Server

![Epic Games Style File Server](https://avatars.githubusercontent.com/u/127679210?v=4)

A modern, dark-themed file server with a card-based interface inspired by the Epic Games Launcher. Features an elegant UI for browsing files and folders, with built-in folder download functionality.

## ✨ Features

- 🎮 Modern card-based interface inspired by Epic Games Launcher
- 🌙 Dark theme for comfortable viewing
- 📁 Easy folder navigation with breadcrumbs
- ⬇️ One-click folder downloads
- 📱 Responsive design for mobile devices
- 🔒 Secure file serving with path validation
- 📦 ZIP compression for folder downloads
- 🚀 Fast file transfers with binary streaming
- 📊 File size display in MB

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/epic-games-style-file-server.git
cd epic-games-style-file-server
```

2. Install dependencies:
```bash
npm install
```

3. Configure the server:
- Open `server.js`
- Modify the `directoryToServe` variable to point to your desired folder
- Adjust `PORT` if needed (default: 3000)

4. Start the server:
```bash
npm start
# or
node server.js
```

5. Access the file server:
Open your browser and navigate to `http://localhost:3000`

## 🔧 Dependencies

- express: Web server framework
- serve-index: Directory listing middleware
- archiver: ZIP file creation for downloads

## 💻 Usage

### Browsing Files
- Click on folders to navigate through the directory structure
- Use the breadcrumb navigation to quickly jump to parent folders
- File sizes are displayed in MB for easy reference

### Downloading
- Single files: Click the "Download File" button on any file card
- Folders: Click the "Download Folder" button to get a ZIP archive
- Progress tracking for large downloads

## ⚙️ Configuration

Key configuration options in `server.js`:

```javascript
const PORT = 3000; // Server port
const directoryToServe = path.join('H:', 'GamesServer'); // Root directory to serve
```

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

