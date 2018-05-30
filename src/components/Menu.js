import React from 'react';

const Menu = (props) => {
    const { onGameStart, onOnlineGameStart } = props;
    return (
        <div className="menu">
            <button onClick={onGameStart}>Start local game</button>
            <button onClick={onOnlineGameStart}>Create online game</button>
        </div>
    );
};

export default Menu;