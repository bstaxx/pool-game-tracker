import React, { Component } from 'react';
import AddPlayer from '../components/AddPlayer';
import Player from '../components/Player';

class Players extends Component {
    constructor( props ) {
        super( props );
        this.onUpdateNewPlayerName = this.onUpdateNewPlayerName.bind( this );
        this.onAddPlayer = this.onAddPlayer.bind( this );
    }

    onUpdateNewPlayerName( event ) { this.props.appProps.onUpdateNewPlayerName( event.target.value ) };
    onAddPlayer() { this.props.appProps.onAddPlayer() };

    componentDidMount() {
        document.querySelector('#newPlayerName').focus();
    }

    render() {
        const players = this.getPlayers();
        const hasPlayers = players && players.length > 0 ? true : false;
        return(
            <div className="Games">
                <AddPlayer appProps={ this.props.appProps } />
                <div className={ hasPlayers ? 'd-none' : 'd-flex justify-content-center mt-3' }>
                    <div className="alert alert-primary" role="alert">Add players to start tracking games.</div>
                </div>
                <ul className="list-group row">{ players }</ul>
            </div>
        );
    }

    getPlayers() {
        return [ ...this.props.appProps.gameTracker.players ]
            .sort( ( a, b ) => {
                let bStats = this.getPlayerStats( b.playerNum );
                let aStats = this.getPlayerStats( a.playerNum );
                return ( bStats.wins - bStats.loses ) - ( aStats.wins - aStats.loses );
                //this.getPlayerStats( b.playerNum ).wins - this.getPlayerStats( a.playerNum ).wins
            })
            .map( ( player, index ) => 
                <Player 
                    key={ player.playerNum }
                    rank={ index }
                    player={ player } 
                    stats={ this.getPlayerStats( player.playerNum ) } 
                    appProps={ this.props.appProps } /> );
    }

    getPlayerStats( playerNum ) {
        const games = this.props.appProps.gameTracker.games;
        games.filter( game => game.players.solid.toString() === playerNum || game.players.striped.toString() === playerNum );
        const reducer = ( stats, game ) => {
            const solidPlayer = game.players.solid.toString();
            const stripedPlayer = game.players.striped.toString();
            if ( game.status === "Tied" ) { return { ...stats, tied: stats.tied + 1 }; }
            if ( solidPlayer === playerNum && game.status.solid === "Won" ) { return { ...stats, wins: stats.wins + 1 } }
            if ( stripedPlayer === playerNum && game.status.striped === "Won" ) { return { ...stats, wins: stats.wins + 1 } }
            if ( solidPlayer === playerNum && game.status.solid === "Lose" ) { return { ...stats, loses: stats.loses + 1 } }
            if ( stripedPlayer === playerNum && game.status.striped === "Lose" ) { return { ...stats, loses: stats.loses + 1 } }
            return stats;
        }
        return games.reduce( reducer, { wins: 0, loses: 0, tied: 0 } );
    }

}

export default Players;