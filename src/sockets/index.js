import *  as ActionTypes from '../constants/ActionTypes';
import { addUser, messageReceived, populateUsersList } from '../actions';


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
        /* const data = JSON.parse(event.data);
        switch(data.type) {
            case types.ADD_USER: {
                dispatch(addUser(data.name));
                break;
            }
            case types.ADD_MESSAGE: {
                dispatch(messageReceived(data.message, data.author));
                break;
            }
            case types.USERS_LIST: {
                dispatch(populateUsersList(data.users));
                break;
            }
            default:
                break;
        } */
    }
    return socket;
};

export default setupSocket;