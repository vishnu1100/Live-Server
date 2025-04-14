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

## 🚀 Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Access the file server at: `http://localhost:3000`

## 🛠️ Configuration

Edit `server.js` to customize:
- `PORT`: Server port (default: 3000)
- `directoryToServe`: Root directory for file serving

## 🔧 Dependencies

- express: Web server framework
- serve-index: Directory listing middleware
- archiver: ZIP file creation for downloads

## 🌐 Deployment with Ngrok

To expose your local server to the internet:

1. Install ngrok:
```bash
npm install ngrok
```

2. Start the tunnel:
```bash
ngrok http 3000
```

## 📝 License

ISC License

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

