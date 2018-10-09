import React, { Component } from 'react';
import AddPlayer from '../components/AddPlayer';

class Players extends Component {
    constructor( props ) {
        super( props );
        this.onUpdateNewPlayerName = this.onUpdateNewPlayerName.bind( this );
        this.onAddPlayer = this.onAddPlayer.bind( this );
    }

    onUpdateNewPlayerName( event ) { this.props.appProps.onUpdateNewPlayerName( event.target.value ) };
    onAddPlayer( event ) { 
        event.preventDefault();
        this.props.appProps.onAddPlayer();
        document.querySelector('#newPlayerName').focus();
        return false;
    };

    render() {
        const players = this.getPlayers();
        const hasPlayers = players && players.length > 0 ? true : false;
        return(
            <div className="Games">
                <AddPlayer appProps={ this.props.appProps } />
                <div className={ hasPlayers ? 'd-none' : 'd-flex justify-content-center mt-3' }>
                    <div className="alert alert-primary" role="alert">Add players to start tracking games.</div>
                </div>
                <ul className="list-group">{ players }</ul>
            </div>
        );
    }

    getPlayers() {
        return [ ...this.props.appProps.gameTracker.players ]
            .map( player => ( { ...player, stats: this.getPlayerStats( player.playerNum ) } ) )
            .sort( ( a, b ) =>  ( b.stats.wins - b.stats.loses ) - ( a.stats.wins - a.stats.loses ) )
            .map( ( player, index ) => {
                    return (
                        <li key={ player.playerNum } className="list-group-item list-group-item-dark d-flex justify-content-between align-items-center" >
                            <div className="col col-md-auto flex-md-grow-1">
                                <div className="h4" >{ player.playerName }</div>
                                <div>{`Rank ${ index + 1 }`}</div>
                            </div>
                            <div className="col col-md-auto">
                                <span className={`badge badge-primary badge-pill`}>{`Games: ${ player.stats.games }`}</span>
                                <span className="badge badge-success badge-pill">{`Wins: ${ player.stats.wins }`}</span>
                                <span className={`badge badge-danger badge-pill`}>{`Loses: ${ player.stats.loses }`}</span>
                            </div>
                        </li>
                    );
            });
    }

    getPlayerStats( playerNum ) {
        const games = this.props.appProps.gameTracker.games.filter( game => 
            game.players.solid.toString() === playerNum || game.players.striped.toString() === playerNum
        );
        const reducer = ( stats, game ) => {
            const solidPlayer = game.players.solid.toString();
            const stripedPlayer = game.players.striped.toString();
            if ( game.status === "Tied" ) { return { ...stats, games: stats.games + 1 }; }
            if ( solidPlayer === playerNum && game.status.solid === "Won" ) { return { ...stats, wins: stats.wins + 1, games: stats.games + 1 } }
            if ( stripedPlayer === playerNum && game.status.striped === "Won" ) { return { ...stats, wins: stats.wins + 1, games: stats.games + 1 } }
            if ( solidPlayer === playerNum && game.status.solid === "Lose" ) { return { ...stats, loses: stats.loses + 1, games: stats.games + 1 } }
            if ( stripedPlayer === playerNum && game.status.striped === "Lose" ) { return { ...stats, loses: stats.loses + 1, games: stats.games + 1 } }
            return stats;
        }
        return games.reduce( reducer, { wins: 0, loses: 0, games: 0 } );
    }

}

export default Players;