import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Constants from '../constants';
import Square from './Square';

class SettingsPanel extends Component {
  static canAllowAI(fieldsCount) {
    if (fieldsCount > 5) {
      alert('AI is too slow with much fields');
      return false;
    }
    return true;
  }

  constructor(props) {
    super(props);
    const {
      fieldsCount,
      winCount,
      playWithAI,
      playAs,
    } = props;
    this.state = {
      fieldsCount,
      winCount,
      playWithAI,
      playAs,
    };

    this.handleFieldsCountChange = this.handleFieldsCountChange.bind(this);
    this.handleWinCountChange = this.handleWinCountChange.bind(this);
    this.handlePlayWithAIChange = this.handlePlayWithAIChange.bind(this);
  }

  getSettings() {
    const {
      winCount, fieldsCount, playWithAI, playAs,
    } = this.state;
    const settings = {
      winCount,
      fieldsCount,
      playWithAI,
      playAs,
    };
    if (Number.isNaN(settings.fieldsCount) || settings.fieldsCount < Constants.MIN_FIELD_SIZE) {
      alert(`Field size less than ${Constants.MIN_FIELD_SIZE}`);
      settings.fieldsCount = Constants.MIN_FIELD_SIZE;
    } else if (settings.fieldsCount > Constants.MAX_FIELD_SIZE) {
      alert(`Field size more than ${Constants.MAX_FIELD_SIZE}`);
      settings.fieldsCount = Constants.MAX_FIELD_SIZE;
    }

    if (Number.isNaN(settings.winCount) || settings.winCount <= 0) {
      alert('Fields to win less than 0');
      settings.winCount = 1;
    } else if (settings.winCount > Constants.MAX_FIELD_SIZE ||
      settings.winCount > fieldsCount) {
      alert('Fields to win more than Field size');
      settings.winCount = settings.fieldsCount;
    }

    if (settings.playWithAI && !SettingsPanel.canAllowAI(settings.fieldsCount)) {
      settings.playWithAI = false;
    }

    this.setState({
      ...settings,
    });
    return settings;
  }

  handleFieldsCountChange({ target: { value: count } }) {
    const fieldsCount = parseInt(count, 10);
    this.setState({
      fieldsCount,
    });
  }

  handleWinCountChange({ target: { value: count } }) {
    const winCount = parseInt(count, 10);
    this.setState({
      winCount,
    });
  }

  handlePlayWithAIChange({ target: { checked: playWithAI } }) {
    this.setState({
      playWithAI,
    });
  }

  handlePlayAs(playAs) {
    this.setState({
      playAs,
    });
  }

  render() {
    const { isOpened, onSave } = this.props;
    const {
      fieldsCount, winCount, playWithAI, playAs,
    } = this.state;
    const isOpenedClass = isOpened ? ' opened' : '';
    const playAsX = playAs === Constants.X_ELEMENT ? ' on' : '';
    const playAsO = playAs === Constants.O_ELEMENT ? ' on' : '';
    return (
      <div className={`panel-settings${isOpenedClass}`}>
        <div>
          <label htmlFor="fields_count">
            Field size:
            <div>
              <input
                id="fields_count"
                min="1"
                max={Constants.MAX_FIELD_SIZE}
                type="number"
                value={fieldsCount}
                onChange={this.handleFieldsCountChange}
              />
            </div>
          </label>
          <label htmlFor="win_count">
            Fields to win:
            <div>
              <input
                id="win_count"
                min="1"
                max={fieldsCount}
                type="number"
                value={winCount}
                onChange={this.handleWinCountChange}
              />
            </div>
          </label>

          <label htmlFor="ai_play">
            Play with AI:
            <div>
              <input
                type="checkbox"
                id="ai_play"
                checked={playWithAI}
                onChange={this.handlePlayWithAIChange}
              />
            </div>
          </label>

          <div />
          
          <button className={`button-square ${playAsX}`} onClick={() => this.handlePlayAs(Constants.X_ELEMENT)}>
            <Square value={Constants.X_ELEMENT} />
          </button>
          <button className={`button-square ${playAsO}`} onClick={() => this.handlePlayAs(Constants.O_ELEMENT)}>
            <Square value={Constants.O_ELEMENT} />
          </button>

          {/* empty div for grid */}
          <div />
          <div>
            <button
              id="save"
              onClick={() => {
                const settings = this.getSettings();
                onSave(settings);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

SettingsPanel.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  fieldsCount: PropTypes.number.isRequired,
  winCount: PropTypes.number.isRequired,
  playWithAI: PropTypes.bool.isRequired,
  playAs: PropTypes.number.isRequired,
};

export default SettingsPanel;
