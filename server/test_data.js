
const fields = {
  id: 'ID',
  name: 'Name',
  player: 'Player',
};

const generateTestGame = (i) => {
  const game = {};
  Object.keys(fields).forEach((key) => {
    game[key] = `${fields[key]} ${i}`;
  });
  return game;
};

module.exports = function* generateTestData(count = 50) {
  let i = 0;
  while (i < count) {
    yield generateTestGame(i);
    i += 1;
  }
};
