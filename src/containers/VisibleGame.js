import { connect } from 'react-redux';
import * as Actions from '../actions';
import Game from '../components/Game';

const mapStateToProps = state => ({
    boardValues: state.boardValues,
    settings: state.settings,
    game: state.game        
});

const mapDispatchToProps = dispatch => ({
    initializeBoard: (fieldsCount) => dispatch(Actions.initializeBoard(fieldsCount)),
    setSquareValue: (index, value) => dispatch(Actions.setSquareValue(index, value)),
    saveSettings: (settings) => dispatch(Actions.saveSettings(settings)),
    toggleSettings: () => dispatch(Actions.toggleSettings()),
    gameReset: () => dispatch(Actions.gameReset()),
    gameTurnChange: (turn) => dispatch(Actions.gameTurnChange(turn)),
    gameSetWinner: (winner, winIndexes) => dispatch(Actions.gameSetWinner(winner, winIndexes))    
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);