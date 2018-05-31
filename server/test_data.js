
const fields = {
    id: "ID",
    name: "Name",
    player: "Player"
}

const generateTestGame = (i) => {       
    let game = {}; 
    Object.keys(fields).forEach(key => {
        game[key] = fields[key] + " " + i
    });
    return game;               
};

module.exports = function *(count = 50) {    
    let i = 0;
    while(i < count) {
        yield generateTestGame(i++);        
    }    
};