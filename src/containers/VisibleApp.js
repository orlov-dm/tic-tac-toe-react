import { connect } from 'react-redux';
import * as Actions from '../actions';
import App from '../App';

const mapStateToProps = state => ({
    isInGame: state.app.isInGame,
    isOnline: state.app.isOnline
});

const mapDispatchToProps = dispatch => ({    
    gameStart: () => dispatch(Actions.gameStart()),
    gameEnd: () => dispatch(Actions.gameEnd()),
    onlineGameStart: () => dispatch(Actions.onlineGameStart()),
    onlineGameEnd: () => dispatch(Actions.onlineGameEnd())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);