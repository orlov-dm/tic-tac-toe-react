import { connect } from 'react-redux';
import * as Actions from '../actions';
import App from '../App';
import setupSocket from '../sockets';

const mapStateToProps = state => ({
    isInGame: state.app.isInGame,
    isOnline: state.app.isOnline,
    gamesList: state.gamesList
});

const mapDispatchToProps = dispatch => ({    
    gameStart: () => dispatch(Actions.gameStart()),
    gameEnd: () => dispatch(Actions.gameEnd()),
    onlineGameStart: () => dispatch(Actions.onlineGameStart()),
    onlineGameEnd: () => dispatch(Actions.onlineGameEnd()),
    setupSocket: () => setupSocket(dispatch)
    requestGamesList: () => dispatch(Actions.requestGamesList())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);