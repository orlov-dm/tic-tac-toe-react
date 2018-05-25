//https://www.kevinhooke.com/2017/04/02/serving-static-content-rest-endpoints-and-websockets-with-express-and-node-js/

const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
//init Express Router
const router = express.Router();
const port = process.env.PORT || 8888;

app.use(express.static(path.resolve(__dirname + '/../build')));
app.get('/games_list', (req, res) => {
    res.json([{test:"test"}, {test:"test1"}]);
});

const indexPath = path.resolve(__dirname + '/../build/index.html');
app.get('*', (req, res) => {
    res.sendFile(indexPath);
});

//start server
const server = app.listen(port, () => {
    console.log('node.js static server listening on port: ' + port + ", with websockets listener");
});
const wss = new WebSocket.Server({ server });
const users = [];

const broadcast = (data, ws) => {
    wss.clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN && client !== ws) {
            client.send(JSON.stringify(data));
        }
    });
};

wss.on('connection', (ws, request) => {
    console.log((new Date()) + ' Connection accepted.');
    
    ws.on('message', (message) => {
        const data = JSON.parse(message);
    });

    ws.on('close', () => {
        
    })
});

//Properly kill nodemon
process.on('SIGINT', () => { console.log(" Stopping..."); process.exit(); });
