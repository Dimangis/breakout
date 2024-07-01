// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ballObj: {
    x: 20,
    y: 200,
    dx: 5,
    dy: 5,
    rad: 20,
    speed: 10,
  },
  brickObj: {
    x: 0.5,
    y: 50,
    width: 800 / 10 - 1,
    height: 20,
    density: 2,
    colors: ("blue", "lightblue"),
  },
  player: {
    name: "PlayerName",
    lives: 5,
    score: 0,
    level: 1,
  },
};
