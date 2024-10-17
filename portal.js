const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const pty = require('node-pty');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || process.argv[2] || 5555;

const terminalShell = process.platform === 'win32' ? 'cmd.exe' : 'bash';

// Serve static files for frontend
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/portal/config', (req, res) => {
    res.json({ webSocketPort: PORT });
});

// When websocket is connected, create new pty session (shell)
wss.on('connection', function connection(ws) {
    const ptyProcess = pty.spawn(terminalShell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.env.HOME,
        env: process.env,
    });

    // Send terminal output to the WebSocket
    ptyProcess.on('data', function (data) {
        ws.send(data);
    });

    // Send input from WebSocket to the terminal
    ws.on('message', function (msg) {
        ptyProcess.write(msg);
    });

    ws.on('close', function () {
        ptyProcess.kill();
    });
});

// Serve on port 5000
server.listen(PORT, function () {
    console.log(`Server is running on http://localhost:${PORT}`);
});