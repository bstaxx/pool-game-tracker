import { 
    ADD_PLAYER, 
    UPDATE_NEW_PLAYER_NAME, 
    UPDATE_SOLID_PLAYER, 
    UPDATE_STRIPED_PLAYER, 
    ADD_GAME,
    UPDATE_BALL
} from '../actions/gameTrackerActions';

export default function gameTrackerReducer( state = {}, { type, payload } ) {
    switch (type) {
        case ADD_PLAYER:
            return {
                ...state,
                players: payload,
                newPlayerName: ''
            };
        case UPDATE_NEW_PLAYER_NAME:
            return {
                ...state,
                newPlayerName: payload
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
                games: payload,
                newGame: {
                    ...state.newGame,
                    players: { striped: '', solid: '' }
                }
            }
        case UPDATE_BALL:
            return {
                ...state,
                games: payload
            }
        default:
            return state;
    }
}

