import { ADD_PLAYER, UPDATE_NEW_PLAYER_NAME, UPDATE_SOLID_PLAYER, UPDATE_STRIPED_PLAYER, ADD_GAME } from '../actions/gameTrackerActions';

export default function gameTrackerReducer( state = {}, { type, payload } ) {
    switch (type) {
        case ADD_PLAYER:
            return {
                ...state,
                newPlayer: {
                    playerName: '',
                    playerNum: state.newPlayer.playerNum + 1
                },
                players: payload,
            };
        case UPDATE_NEW_PLAYER_NAME:
            return {
                ...state,
                newPlayer: payload
            };
        case UPDATE_SOLID_PLAYER:
            return {
                ...state,
                newGame: {
                    ...state.newGame,
                    players: {
                        ...state.newGame.players,
                        solid: payload
                    }
                }
            }
        case UPDATE_STRIPED_PLAYER:
            return {
                ...state,
                newGame: {
                    ...state.newGame,
                    players: {
                        ...state.newGame.players,
                        striped: payload
                    }
                }
            }
        case ADD_GAME:
            return {
                ...state,
                newGame: {
                    ...state.newGame,
                    gameNum: state.newGame.gameNum + 1
                },
                games: payload
            }
        default:
            return state;
    }
}

