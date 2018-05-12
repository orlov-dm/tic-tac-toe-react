import React, { Component } from 'react';
import Constants from '../constants';
import Square from './Square';

class SettingsPanel extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            fieldsCount: Constants.MIN_FIELD_SIZE,
            winCount: Constants.MIN_FIELD_SIZE,
            playWithAI: true,
            playAs: Constants.X_ELEMENT
        };
    }

    render() {
        const { isOpened, onSave } = this.props;
        const { fieldsCount, winCount, playWithAI, playAs } = this.state;
        const isOpenedClass = isOpened ? " opened" : "";
        const playAsX = playAs === Constants.X_ELEMENT ? " on" : "";
        const playAsO = playAs === Constants.O_ELEMENT ? " on" : "";
        return (
            <div className={`panel-settings${isOpenedClass}`}>
                <div>
                    <label htmlFor="fields_count">Field size:</label>
                    <div>
                        <input id="fields_count" min="1" max={Constants.MAX_FIELD_SIZE} type="number" 
                            value={fieldsCount} onChange={(event) => this.handleFieldsCountChange(event.target.value)} />
                    </div>

                    <label htmlFor="win_count">Fields to win:</label>
                    <div>
                        <input id="win_count" min="1" max={fieldsCount} type="number"
                            value={winCount} onChange={(event) => this.handleWinCountChange(event.target.value)} />
                    </div>

                    <label htmlFor="ai_play">Play with AI:</label>
                    <div>
                        <input type="checkbox" id="ai_play" checked={playWithAI} onChange={(event) => this.handlePlayWithAIChange(event.target.checked)} />
                    </div>

                   <button className={"button-square" + playAsX} onClick={() => this.handlePlayAs(Constants.X_ELEMENT)}>
                        <Square value={Constants.X_ELEMENT} />
                    </button>
                    <button className={"button-square" + playAsO} onClick={() => this.handlePlayAs(Constants.O_ELEMENT)}>
                        <Square value={Constants.O_ELEMENT} />
                    </button>

                    {/* empty div for grid */}
                    <div></div> 
                    <div>
                        <button id="save" onClick={() => {
                            const settings = this.getSettings();
                            onSave(settings);
                        }}>Save</button>
                    </div>
                </div>
            </div>
        );
    }

    getSettings() {
        const { winCount, fieldsCount, playWithAI, playAs } = this.state;
        let settings = {
            winCount,
            fieldsCount,
            playWithAI,
            playAs
        }
        if (isNaN(settings.fieldsCount) || settings.fieldsCount < Constants.MIN_FIELD_SIZE) {
            alert(`Field size less than ${Constants.MIN_FIELD_SIZE}`);
            settings.fieldsCount = Constants.MIN_FIELD_SIZE;
        } else if (settings.fieldsCount > Constants.MAX_FIELD_SIZE) {
            alert(`Field size more than ${Constants.MAX_FIELD_SIZE}`);
            settings.fieldsCount = Constants.MAX_FIELD_SIZE;
        }

        if (isNaN(settings.winCount) || settings.winCount <= 0) {
            alert("Fields to win less than 0");
            settings.winCount = 1;
        } else if (settings.winCount > Constants.MAX_FIELD_SIZE ||
            settings.winCount > fieldsCount) {
            alert("Fields to win more than Field size");
            settings.winCount = settings.fieldsCount;
        }

        if (settings.playWithAI && !this.canAllowAI(settings.fieldsCount)) {
            settings.playWithAI = false;
        }

        this.setState({
            ...settings
        });
        return settings;
    }

    handleFieldsCountChange(count) {
        const fieldsCount = parseInt(count, 10);
        this.setState({
            fieldsCount
        });
    }

    handleWinCountChange(count) {
        const winCount = parseInt(count, 10);
        this.setState({
            winCount
        });
    }

    handlePlayWithAIChange(playWithAI) {
        this.setState({
            playWithAI
        });
    }

    handlePlayAs(playAs) {        
        this.setState({
            playAs
        });
    }

    canAllowAI(fieldsCount) {
        if (fieldsCount > 5) {
            alert("AI is too slow with much fields");
            return false;
        }
        return true;
    }
}

export default SettingsPanel;