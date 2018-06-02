//https://www.kevinhooke.com/2017/04/02/serving-static-content-rest-endpoints-and-websockets-with-express-and-node-js/

const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const generateTestData = require('./test_data');
const ActionTypes = require('./ActionTypes');

const app = express();
//init Express Router
const router = express.Router();
const port = process.env.PORT || 8888;

const test = false;
/* const data = generateTestData(); */
let gamesCounter = 0;
let gamesMap = new Map;
let players = new Map;
let playerClients = new Map;
if (test) {
    for (const game of generateTestData()) {
        gamesMap.set(game.id, game);
    };
}

app.use(express.static(path.resolve(__dirname + '/../build')));
app.get('/games_list', (req, res) => {
    res.json([...gamesMap.values()]);
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
/* const users = {}; */
let counter = 0;

const send = (data, client) => {
    if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
    }
}

const broadcast = (data, exceptWS) => {    
    wss.clients.forEach((client) => {
        if(client === exceptWS) {
            return;
        }
        send(data, client);
    });
};

wss.on('connection', (ws, request) => {
    console.log((new Date()) + ' Connection accepted.');
    const player = {
        id: counter,
        name: `User ${counter++}`
    };
    players.set(player.id, player);
    playerClients.set(player.id, ws);
    
    ws.send(JSON.stringify({
        type: ActionTypes.APP_ONLINE_SET_PLAYER_INFO,
        player
    }));
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        switch (data.type) {
            case ActionTypes.APP_ONLINE_GAME_START: {
                console.log("APP_ONLINE_GAME_START", data);
                const game = {
                    id: gamesCounter++,
                    author: player.name,
                    player1: player,
                    player2: null
                };
                gamesMap.set(game.id, game);
                //broadcast same event to all to update games list
                broadcast({ ...data, game });
                //send game info to p1
                send({
                    type: ActionTypes.APP_ONLINE_SET_GAME_INFO,
                    game
                }, ws);
                break;
            }
            case ActionTypes.APP_ONLINE_GAME_JOIN: {
                console.log("APP_ONLINE_GAME_JOIN", data);
                const { gameID } = data;
                const game = gamesMap.get(gameID);
                //if null or busy
                if(!game || game.player1 && game.player2) {
                    //todo error
                    console.log(`Game ${gameID} is busy`);
                    break;
                }                
                gamesMap.set(gameID, {
                    ...game,
                    player2: player
                });

                const resultGame = gamesMap.get(gameID);
                broadcast({ 
                    type: ActionTypes.APP_ONLINE_GAME_RUNNING,
                    game: resultGame
                });
                //inform player that created game
                const player1Client = playerClients.get(resultGame.player1.id);                
                if(player1Client) {
                    send({
                        type: ActionTypes.APP_ONLINE_SET_GAME_INFO,
                        game: resultGame
                    }, player1Client);

                    //inform player that tried to join                    
                    send({
                        //swap players for easier management
                        //gui player is always first player and opponent is second
                        type: ActionTypes.APP_ONLINE_SET_GAME_INFO,
                        game: {
                            ...resultGame,
                            player1: resultGame.player2,
                            player2: resultGame.player1
                        }
                    }, ws);
                } else {
                    //todo send error notification to player that tried to join
                }                
                break;
            }
            case ActionTypes.APP_ONLINE_GAME_END: {
                console.log("APP_ONLINE_GAME_END", data);
                const { gameID } = data;
                const game = gamesMap.get(gameID);
                const secondPlayerID = game.player1 === player.id ? game.player2 : game.player1;
                const client = playerClients.get(secondPlayerID);
                if(client) {
                    send({
                        type: ActionTypes.APP_ONLINE_SET_GAME_INFO,
                        game: null
                    }, client);
                }   
                gamesMap.delete(gameID);                
                broadcast(data);
                break;
            }
        }
    });

    ws.on('close', () => {
        console.log((new Date()) + ' Connection accepted.');
        players.delete(player.id);
        playerClients.delete(player.id);
        let gameIDsToDelete = [];
        for(const game of gamesMap) {
            if(game.player1 === player.id || game.player2 === player.id) {
                gameIDsToDelete.push(game.id);
            }
        }
        for(const gameID of gameIDsToDelete) {
            gamesMap.delete(gameID);
        }
    })
});

//Properly kill nodemon
process.on('SIGINT', () => { console.log(" Stopping..."); process.exit(); });


//https://github.com/websockets/ws#how-to-detect-and-close-broken-connections
