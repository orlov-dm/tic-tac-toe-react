//https://www.kevinhooke.com/2017/04/02/serving-static-content-rest-endpoints-and-websockets-with-express-and-node-js/

const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
//init Express Router
const router = express.Router();
const port = process.env.PORT || 8888;

//return static page with websocket client
// router.get('/',(req, res) => {
//     res.send(express.static('../build'));
// });
// app.use('/', express.static('../build'));
/* router.get('/test1',(req, res) => {
    res.sendFile(path.join(__dirname, '../build'));
}); */
console.log(path.normalize(__dirname + '/../build'));
app.use(express.static(path.normalize(__dirname + '/../build')));
app.get('/test', (req, res) => {
    res.json({test: "test"});
});

const indexPath = path.resolve(__dirname + '/../build/index.html');
console.log(indexPath);
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
