import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './App';

//import * as serviceWorker from './serviceWorker';

import { applyMiddleware, combineReducers, createStore } from 'redux'; // predictable state container
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux'; // integrages react and redux
import thunk from 'redux-thunk'; // middleware that gives direct access to redux's dispatch function to make ASYNC requests

import gameTrackerReducer from './reducers/gameTrackerReducer';

const allReducers = combineReducers({ gameTracker: gameTrackerReducer });

const initialState = {
    gameTracker: {
        newPlayer: {
            playerName: '',
            playerNum: 1
        },
        newGame: {
            gameNum: 1,
            players: {
                striped: {},
                solid: {}
            },
            balls:{
                0: { type: 'cue', sunk: false },
                1: { type: 'solid', sunk: false },
                2: { type: 'solid', sunk: false },
                3: { type: 'solid', sunk: false },
                4: { type: 'solid', sunk: false },
                5: { type: 'solid', sunk: false },
                6: { type: 'solid', sunk: false },
                7: { type: 'solid', sunk: false },
                8: { type: 'solid', sunk: false },
                9: { type: 'striped', sunk: false },
                10: { type: 'striped', sunk: false },
                11: { type: 'striped', sunk: false },
                12: { type: 'striped', sunk: false },
                13: { type: 'striped', sunk: false },
                14: { type: 'striped', sunk: false },
                15: { type: 'striped', sunk: false }
            }
        },
        players: [],
        games: []
    }
};

const allStoreEnhancers = composeWithDevTools(
    applyMiddleware( thunk )
);

const store = createStore( 
    allReducers, 
    initialState,
    allStoreEnhancers
);

ReactDOM.render( 
    <Provider store={ store }>
        <BrowserRouter basename={ '/' }> 
            <Route render={(props) => <App router={props} />} />
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
