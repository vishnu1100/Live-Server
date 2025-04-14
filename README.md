# Ngrok Setup and Usage Guide

Ngrok is a tool that creates secure tunnels to your localhost, allowing you to expose local servers to the internet. This guide provides step-by-step instructions on installing, configuring, and using Ngrok.

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
   - [Windows](#windows)
   - [macOS](#macos)
   - [Linux](#linux)
3. [Configuration](#configuration)
   - [Connect Your Ngrok Account](#connect-your-ngrok-account)
4. [Usage](#usage)
   - [Expose a Local Server](#expose-a-local-server)
   - [Custom Subdomains and Reserved Domains](#custom-subdomains-and-reserved-domains)
   - [Secure Your Application](#secure-your-application)
5. [Running Ngrok Persistently](#running-ngrok-persistently)
   - [Windows Service](#windows-service)
   - [Systemd Service (Linux)](#systemd-service-linux)
6. [Additional Features](#additional-features)
   - [Traffic Inspection](#traffic-inspection)
   - [Webhook Testing](#webhook-testing)
7. [Troubleshooting](#troubleshooting)
8. [Conclusion](#conclusion)

## 1. Introduction

Ngrok is a service that enables you to expose your local development server to the internet. It provides a public URL that tunnels to your local machine, making it accessible from anywhere. This is particularly useful for testing webhooks, sharing work-in-progress, or accessing your local server remotely.

## 2. Installation

### Windows

1. **Download Ngrok**:
   - Visit the [Ngrok download page](https://ngrok.com/download) and download the Windows version.
   - Alternatively, use Chocolatey to install Ngrok:
     ```powershell
     choco install ngrok
     ```

2. **Extract and Install**:
   - Extract the downloaded ZIP file to a location of your choice, such as `C:\ngrok`.
   - Add the Ngrok directory to your system's PATH environment variable:
     - Right-click on 'This PC' or 'Computer' on the desktop or in File Explorer.
     - Click 'Properties'.
     - Select 'Advanced system settings' on the left.
     - In the 'System Properties' window, click the 'Environment Variables' button.
     - In the 'System variables' section, select 'Path' and click 'Edit'.
     - Click 'New' and add the path to your Ngrok directory (e.g., `C:\ngrok`).
     - Click 'OK' to apply the changes.

3. **Verify Installation**:
   - Open Command Prompt and run:
     ```cmd
     ngrok version
     ```
   - You should see Ngrok's version information.

### macOS

1. **Download Ngrok**:
   - Visit the [Ngrok download page](https://ngrok.com/download) and download the macOS version.

2. **Extract and Install**:
   - Open Terminal.
   - Navigate to the directory containing the downloaded ZIP file.
   - Run:
     ```bash
     unzip ngrok-stable-darwin-amd64.zip
     sudo mv ngrok /usr/local/bin
     ```

3. **Verify Installation**:
   - In Terminal, run:
     ```bash
     ngrok version
     ```
   - You should see Ngrok's version information.

### Linux

1. **Download Ngrok**:
   - Open Terminal.
   - Run:
     ```bash
     wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
     ```

2. **Extract and Install**:
   - Run:
     ```bash
     unzip ngrok-stable-linux-amd64.zip
     sudo mv ngrok /usr/local/bin
     ```

3. **Verify Installation**:
   - In Terminal, run:
     ```bash
     ngrok version
     ```
   - You should see Ngrok's version information.

## 3. Configuration

### Connect Your Ngrok Account

To unlock additional features and avoid rate limits, it's recommended to connect Ngrok to your account:

1. **Sign Up**:
   - Visit the [Ngrok signup page](https://dashboard.ngrok.com/signup) to create an account.

2. **Obtain Authtoken**:
   - After logging in, navigate to the [Authtoken page](https://dashboard.ngrok.com/get-started/your-authtoken) to find your unique authtoken.

3. **Set Authtoken**:
   - In your terminal or command prompt, run:
     ```bash
     ngrok config add-authtoken YOUR_AUTHTOKEN
     ```
   - Replace `YOUR_AUTHTOKEN` with the authtoken you obtained.

## 4. Usage

### Expose a Local Server

1. **Start Your Local Server**:
   - Ensure your local server is running on a specific port, e.g., port 3000.

2. **Start Ngrok Tunnel**:
   - In a new terminal or command prompt window, run:
     ```bash
     ngrok http 3000
     ```
   - Ngrok will provide a public URL (e.g., `http://abcd1234.ngrok.io`) that tunnels to your local server.

### Custom Subdomains and Reserved Domains

To use custom subdomains or reserved domains:

1. **Reserve a Domain**:
   - Log in to your Ngrok dashboard.
   - Navigate to "Reserved" under "Endpoints" and reserve your desired subdomain.

2. **Start Ngrok with Reserved Domain**:
   - Run:
     ```bash
     ngrok http -subdomain=yourcustomsubdomain 3000
     ```

### Secure Your Application

To add basic authentication:

1. **Start Ngrok with Auth**:
   - Run:
     ```bash
     ngrok http -auth="username:password" 3000
     ```
   - Replace `username` and `password` with your desired credentials.

## 5. Running Ngrok Persistently

### Windows Service

To run Ngrok as a Windows service:

1. **Create a Service**:
   - Use tools like NSSM (Non-Sucking Service Manager) to create a service that runs Ngrok at startup.

2. **Configure Service**:
   - Set the service to run the Ngrok command with your desired parameters.

### Systemd Service (Linux)

To run Ngrok as a systemd service:

1. **Create Service File**:
   - Create a file at `/etc/systemd/system/ngrok.service` with the following content:
     ```
     [Unit]
     Description=Ngrok Service
     After=network.target

     [Service]
     ExecStart=/usr/local/bin/ngrok http 3000
     Restart=on-failure

     [Install]
     WantedBy=multi-user.target
     ```
2. **Enable and Start the Service**:
   - Run:
     ```bash
     sudo systemctl enable ngrok
     sudo systemctl start ngrok
     ```

## 6. Additional Features

### Traffic Inspection

Ngrok provides a web interface for inspecting the traffic flowing through your tunnel. By default, it runs at `http://localhost:4040`. You can view detailed logs and request inspection from here.

### Webhook Testing

Ngrok is especially useful for testing webhooks, as it allows you to expose local endpoints to external services. After setting up your Ngrok tunnel, use the provided URL in the service you're testing.

## 7. Troubleshooting

- **Error: Unable to connect to localhost**:
  - Make sure your local server is running and accessible at the specified port.
  
- **Error: AuthToken required**:
  - Make sure you've added your Ngrok auth token to the configuration using `ngrok config add-authtoken YOUR_AUTHTOKEN`.

## 8. Conclusion

Ngrok is a powerful tool for tunneling your local development environment to the public internet. With simple commands, you can expose your local server to the world, making it easy to test, share, and debug your applications.

For further information, visit the [Ngrok documentation](https://ngrok.com/docs).

