import *  as ActionTypes from '../constants/ActionTypes';
import { gamesListAdd, gamesListRemove, onlineGameSetPlayerInfo, onlineGameSetInfo, setSettingsField, onlineGameSetTurn, onlineGameSetSquareValue } from '../actions';


const setupSocket = (dispatch, port = 8888) => {
    const uri = `ws://${window.location.hostname}:${port}`;
    const socket = new WebSocket(uri);

    socket.onopen = () => {
        console.log(`Established connection to ${uri}`);
        /* socket.send(JSON.stringify({
            type: types.ADD_USER,
            name: username
        })) */
    };

    socket.onmessage = (event) => {  
        console.log(event);
        const data = JSON.parse(event.data);
        switch(data.type) {
            case ActionTypes.APP_ONLINE_SET_PLAYER_INFO: {
                const { player } = data;
                dispatch(onlineGameSetPlayerInfo(player));
                break;
            }
            case ActionTypes.APP_ONLINE_GAME_START: {
                const { game } = data;
                dispatch(gamesListAdd(game));
                break;
            }
            case ActionTypes.APP_ONLINE_GAME_END: {
                const { gameID } = data;
                dispatch(gamesListRemove(gameID));
                break;
            }
            case ActionTypes.APP_ONLINE_GAME_RUNNING: {
                const { gameID } = data;
                //remove game from list to other players
                dispatch(gamesListRemove(gameID));                
                break;
            }            
            case ActionTypes.APP_ONLINE_SET_GAME_INFO: {
                const { game } = data;
                dispatch(onlineGameSetInfo(game));
                if(game) {
                    if(game.hasOwnProperty('turn')) {
                        const { turn } = game;
                        dispatch(onlineGameSetTurn(turn));
                    }
                    if(game.hasOwnProperty('playAs')) {
                        const { playAs } = game;
                        dispatch(setSettingsField('playAs', playAs));
                    }
                }
                break;
            }
            case ActionTypes.GAME_TURN_CHANGE: {
                const { turn } = data;
                dispatch(onlineGameSetTurn(turn));
                break;
            }
            case ActionTypes.SET_SQUARE_VALUE: {
                const { index, value } = data;
                dispatch(onlineGameSetSquareValue(index, value));
                break;
            }
            default:
                break;
        }
    }
    return socket;
};

export default setupSocket;