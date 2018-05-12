import { connect } from 'react-redux';
import { initializeBoard, setSquareValue, saveSettings } from '../actions';
import Game from '../components/Game';

const mapStateToProps = state => ({
    boardValues: state.boardValues,
    settings: state.settings
});

const mapDispatchToProps = dispatch => ({
    initializeBoard: (fieldsCount) => dispatch(initializeBoard(fieldsCount)),
    setSquareValue: (index, value) => dispatch(setSquareValue(index, value)),
    saveSettings: (settings) => dispatch(saveSettings(settings)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);