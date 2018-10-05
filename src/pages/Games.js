import React, { Component } from 'react';
import AddGame from '../components/AddGame';
import Game from '../components/Game';

class Games extends Component {
    constructor( props ) {
        super( props );
        this.onUpdateNewPlayerName = this.onUpdateNewPlayerName.bind( this );
        this.onAddPlayer = this.onAddPlayer.bind( this );
    }

    onUpdateNewPlayerName( event ) { this.props.appProps.onUpdateNewPlayerName( event.target.value ) };
    onAddPlayer() { this.props.appProps.onAddPlayer() };

    render() {
        const games = this.getGames();
        const hasGames = games && games.length > 0 ? true : false;
        return (
        <div className="Games">
            <AddGame appProps={ this.props.appProps } />
            <div className={ hasGames ? 'd-none' : 'd-flex justify-content-center mt-3' }>
                <div className="alert alert-primary" role="alert">Add a game to track.</div>
            </div>
            <ul className="list-group row">{ games }</ul>
        </div>
        );
    }

    getGames() {
        return [ ...this.props.appProps.gameTracker.games ]
            .map( game => <Game key={ game.gameNum } game={ game } appProps={ this.props.appProps } /> );
    }

}

export default Games;