export const ADD_PLAYER = 'gameTracker:addPlayer';
export const addPlayer = () => ( dispatch, getState ) => {
  const state = getState();
  const newPlayer = { ...state.gameTracker.newPlayer };
  const players = state.gameTracker.players ? [ ...state.gameTracker.players, newPlayer ] : [ newPlayer ];
  dispatch({
    type: ADD_PLAYER,
    payload: players
  });

}

export const ADD_GAME = 'gameTracker:addGame';
export const addGame = () => ( dispatch, getState ) => {
  const state = getState();
  const newGame = { ...state.gameTracker.newGame };
  const games = state.gameTracker.games ? [ ...state.gameTracker.games, newGame ] : [ newGame ];
  dispatch({
    type: ADD_GAME,
    payload: games
  });
  /*dispatch({
    type: UPDATE_NEW_PLAYER_NAME,
    payload: { playerName: '', playerNum: newPlayer.playerNum + 1 }
  })*/
}

export const UPDATE_NEW_PLAYER_NAME = 'gameTracker:updateNewPlayerName';
export const updateNewPlayerName = ( newPlayerName ) => ( dispatch, getState ) => {
  const state = getState();
  const playerNum =  state.gameTracker.players ? state.gameTracker.players.length + 1 : 1;
  const newPlayer = { playerName: newPlayerName, playerNum: playerNum };
  dispatch({
      type: UPDATE_NEW_PLAYER_NAME,
      payload: newPlayer
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