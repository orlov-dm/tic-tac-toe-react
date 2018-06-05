import { connect } from 'react-redux';
import * as Actions from '../actions';
import App from '../App';

const mapStateToProps = state => ({
    isInGame: state.app.isInGame,
    gamesList: state.gamesList,
    onlineGameID: state.app.onlineGameID,
    onlineOpponent: state.app.onlineOpponent,
});

const mapDispatchToProps = dispatch => ({    
    gameStart: () => dispatch(Actions.gameStart()),
    gameEnd: () => dispatch(Actions.gameEnd()),
    onlineGameStart: () => dispatch(Actions.onlineGameStart()),
    onlineGameJoin: (gameID) => dispatch(Actions.onlineGameJoin(gameID)),    
    onlineGameEnd: (gameID) => dispatch(Actions.onlineGameEnd(gameID)),    
    requestGamesList: () => dispatch(Actions.requestGamesList())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);