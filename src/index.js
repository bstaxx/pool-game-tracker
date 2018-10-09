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
        pages: [],
        newPlayerName: '',
        newGame: {
            gameNum: '',
            players: {
                striped: '',
                solid: ''
            },
            balls: [
                { ballNum: 0, type: 'cue', sunk: false, player: '' },
                { ballNum: 1, type: 'solid', sunk: false, player: '' },
                { ballNum: 2, type: 'solid', sunk: false, player: '' },
                { ballNum: 3, type: 'solid', sunk: false, player: '' },
                { ballNum: 4, type: 'solid', sunk: false, player: '' },
                { ballNum: 5, type: 'solid', sunk: false, player: '' },
                { ballNum: 6, type: 'solid', sunk: false, player: '' },
                { ballNum: 7, type: 'solid', sunk: false, player: '' },
                { ballNum: 8, type: 'solid', sunk: false, player: '' },
                { ballNum: 9, type: 'striped', sunk: false, player: '' },
                { ballNum: 10, type: 'striped', sunk: false, player: '' },
                { ballNum: 11, type: 'striped', sunk: false, player: '' },
                { ballNum: 12, type: 'striped', sunk: false, player: '' },
                { ballNum: 13, type: 'striped', sunk: false, player: '' },
                { ballNum: 14, type: 'striped', sunk: false, player: '' },
                { ballNum: 15, type: 'striped', sunk: false, player: '' }
            ],
            status: 'Tied'
        },
        players: [
            { playerNum: '1', playerName: 'Sam' },
            { playerNum: '2', playerName: 'Billy' },
            { playerNum: '3', playerName: 'Clyde' },
            { playerNum: '4', playerName: 'Pam' },
            { playerNum: '5', playerName: 'Roy' },
        ],
        games: [
            {
                gameNum: '1',
                players: {
                    striped: '1',
                    solid: '2'
                },
                balls: [
                    { ballNum: 0, type: 'cue', sunk: false, player: '' },
                    { ballNum: 1, type: 'solid', sunk: false, player: '' },
                    { ballNum: 2, type: 'solid', sunk: false, player: '' },
                    { ballNum: 3, type: 'solid', sunk: false, player: '' },
                    { ballNum: 4, type: 'solid', sunk: false, player: '' },
                    { ballNum: 5, type: 'solid', sunk: false, player: '' },
                    { ballNum: 6, type: 'solid', sunk: false, player: '' },
                    { ballNum: 7, type: 'solid', sunk: false, player: '' },
                    { ballNum: 8, type: 'solid', sunk: false, player: '' },
                    { ballNum: 9, type: 'striped', sunk: false, player: '' },
                    { ballNum: 10, type: 'striped', sunk: false, player: '' },
                    { ballNum: 11, type: 'striped', sunk: false, player: '' },
                    { ballNum: 12, type: 'striped', sunk: false, player: '' },
                    { ballNum: 13, type: 'striped', sunk: false, player: '' },
                    { ballNum: 14, type: 'striped', sunk: false, player: '' },
                    { ballNum: 15, type: 'striped', sunk: false, player: '' }
                ],
                status: 'Tied'
            }
        ]
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
        <BrowserRouter basename={ window.location.pathname }> 
            <Route render={ ( props ) => <App router={ props } />} />
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
