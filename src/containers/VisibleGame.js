import { connect } from 'react-redux';
import { initializeBoard, setSquareValue } from '../actions';
import Game from '../components/Game';

const mapStateToProps = state => ({
    boardValues: state.boardValues
});

const mapDispatchToProps = dispatch => ({
    initializeBoard: (fieldsCount) => dispatch(initializeBoard(fieldsCount)),
    setSquareValue: (index, value) => dispatch(setSquareValue(index, value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);