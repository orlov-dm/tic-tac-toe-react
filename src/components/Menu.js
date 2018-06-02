import React from 'react';
import GamesList from '../containers/GamesList';

const Menu = (props) => {
    const { onGameStart, onOnlineGameStart, onOnlineGameJoin, gamesList } = props;
    return (
        <div className="menu">
            <button onClick={onGameStart}>Start local game</button>
            <button onClick={onOnlineGameStart}>Create online game</button>
            <GamesList 
                games={gamesList.isFetching ? [] : gamesList.items}
                onGameJoin={onOnlineGameJoin}
            />
        </div>
    );
};

export default Menu;