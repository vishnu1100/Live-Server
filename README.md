# Epic Games Style File Server

![Epic Games Style File Server](https://avatars.githubusercontent.com/u/127679210?v=4)

A modern, dark-themed file server with a card-based interface inspired by the Epic Games Launcher. Features an elegant UI for browsing files and folders, with built-in folder download functionality and Cloudflare integration for secure remote access.

## ✨ Features

- 🎮 Modern card-based interface inspired by Epic Games Launcher
- 🌙 Dark theme for comfortable viewing
- 📁 Easy folder navigation with breadcrumbs
- ⬇️ One-click folder downloads with progress tracking
- 📱 Responsive design for mobile devices
- 🔒 Secure file serving with path validation
- 📦 ZIP compression for folder downloads
- 🚀 Fast file transfers with binary streaming
- 📊 Real-time download progress with speed and ETA
- ☁️ Cloudflare integration for remote access

## 🚀 Quick Start

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/epic-games-style-file-server.git
cd epic-games-style-file-server
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
# or use the batch file
.\start_server.bat
```

4. Access the server at `http://localhost:3000`

### Cloudflare Setup

1. Install Cloudflared:
```bash
# Windows (using Chocolatey)
choco install cloudflared

# Windows (manual installation)
# Download from https://github.com/cloudflare/cloudflared/releases
# Add the executable to your PATH
```

2. Authenticate Cloudflared:
```bash
cloudflared tunnel login
```

3. Create a tunnel:
```bash
cloudflared tunnel create epic-file-server
```

4. Configure the tunnel (create `config.yml`):
```yaml
tunnel: <Tunnel-UUID>
credentials-file: C:\Users\<YourUser>\.cloudflared\<Tunnel-UUID>.json

ingress:
  - hostname: your-domain.example.com
    service: http://localhost:3000
  - service: http_status:404
```

5. Start the tunnel:
```bash
cloudflared tunnel run epic-file-server
```

## 💻 Usage

1. Place your files in the desired directory
2. Start the server using the provided commands
3. Browse through your files using the elegant card interface
4. Click on folders to navigate through the directory structure
5. Use the download button to get a ZIP archive of any folder
6. Monitor download progress with the built-in progress tracker

## ⚙️ Configuration

Edit `server.js` to customize these settings:

```javascript
const PORT = 3000;                    // Server port
const ROOT_DIR = './games';           // Root directory for files
const DOWNLOAD_CHUNK_SIZE = 1024*1024; // Chunk size for downloads
```

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

