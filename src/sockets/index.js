import *  as ActionTypes from '../constants/ActionTypes';
import { gamesListAdd } from '../actions';


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
            case ActionTypes.APP_ONLINE_GAME_START: {
                const { game } = data;
                dispatch(gamesListAdd(game));
                break;
            }
            default:
                break;
        }
    }
    return socket;
};

export default setupSocket;