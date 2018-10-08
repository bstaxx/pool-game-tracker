export const ADD_PLAYER = 'gameTracker:addPlayer';
export const addPlayer = () => ( dispatch, getState ) => {
  const gameTracker = { ...getState().gameTracker };
  const newPlayer = { playerName: gameTracker.newPlayerName, playerNum: gameTracker.players.length + 1 };
  const players = gameTracker.players ? [ ...gameTracker.players, newPlayer ] : [ newPlayer ];
  dispatch({
    type: ADD_PLAYER,
    payload: players
  });

}

export const ADD_GAME = 'gameTracker:addGame';
export const addGame = () => ( dispatch, getState ) => {
  const gameTracker = { ...getState().gameTracker };
  const newGame = { ...gameTracker.newGame, gameNum: gameTracker.games.length + 1 };
  const games = gameTracker.games ? [ ...gameTracker.games, newGame ] : [ newGame ];
  dispatch({
    type: ADD_GAME,
    payload: games
  });
}

export const UPDATE_NEW_PLAYER_NAME = 'gameTracker:updateNewPlayerName';
export const updateNewPlayerName = ( newPlayerName ) => ( dispatch, getState ) => {
  console.log( newPlayerName );
  dispatch({
    type: UPDATE_NEW_PLAYER_NAME,
    payload: newPlayerName
  });
}

export const UPDATE_SOLID_PLAYER = 'gameTracker:updateSolidPlayer';
export const updateSolidPlayer = ( solidPlayer ) => ( dispatch, getState ) => {
  dispatch({
    type: UPDATE_SOLID_PLAYER,
    payload: solidPlayer
  });
}

export const UPDATE_STRIPED_PLAYER = 'gameTracker:updateStripedPlayer';
export const updateStripedPlayer = ( stripedPlayer ) => ( dispatch, getState ) => {
  dispatch({
    type: UPDATE_STRIPED_PLAYER,
    payload: stripedPlayer
  });
}

export const UPDATE_BALL = 'gameTracker:updateBall';
export const updateBall = ( input ) => ( dispatch, getState ) => {
  const inputValue = JSON.parse( input.value );
  const games = [ ...getState().gameTracker.games ];
  let game = games[ games.findIndex( selectedGame => selectedGame.gameNum.toString() === inputValue.gameNum.toString() ) ]
  game.balls = game.balls.map( ball => {
    if ( ball.ballNum === inputValue.ballNum ) { ball = { ...ball, sunk: input.checked, player: input.checked ? inputValue.player : '' } }
    return ball;
  });
  const eightBall = game.balls.filter( ball => ball.ballNum === 8 )[0];
  const sunkenBalls = {
      striped: game.balls.filter( ball => ball.sunk && ball.type === "striped" ),
      solid: game.balls.filter( ball => ball.sunk && ball.type === "solid" )
  };
  game.status = "Tied";
  if ( sunkenBalls.solid.length > sunkenBalls.striped.length ) { game.status = { solid: 'Winning', striped: 'Losing' } }
  if ( sunkenBalls.solid.length < sunkenBalls.striped.length ) { game.status = { solid: 'Losing', striped: 'Winning' } }
  if ( sunkenBalls.solid.length === 8 ) { game.status = { solid: 'Won', striped: 'Lose' } } 
  if ( sunkenBalls.striped.length === 7 && eightBall.sunk ) { game.status = { solid: 'Lose', striped: 'Won' } }
  if ( eightBall.sunk && eightBall.player === 'solid' && sunkenBalls.solid.length < 8 ) { game.status = { solid: 'Lose', striped: 'Won' } }
  if ( eightBall.sunk && eightBall.player === 'striped' && sunkenBalls.striped.length < 7 ) { game.status = { solid: 'Won', striped: 'Lose' } }
  dispatch({
    type: UPDATE_STRIPED_PLAYER,
    payload: games
  });

}