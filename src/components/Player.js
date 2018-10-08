import React, { Component } from 'react';

class Player extends Component {

    render() {
        const playerNum = this.props.player.playerNum.toString();
        const playerStats = this.getPlayerStats( playerNum );
        return (
            <li className="list-group-item list-group-item-dark d-flex justify-content-between align-items-center" >
                <div className="col col-md-auto flex-md-grow-1">
                    <div className="h4" >{ this.getPlayerFromID( playerNum ).playerName }</div>
                    <div>{`Rank ${ this.props.rank + 1 }`}</div>
                </div>
                <div className="col col-md-auto">
                    <span className="badge badge-success badge-pill">{`Wins: ${ playerStats.wins }`}</span>
                    <span className={`badge badge-danger badge-pill`}>{`Loses: ${ playerStats.loses }`}</span>
                    <span className={`badge badge-warning badge-pill`}>{`Ties: ${ playerStats.tied }`}</span>
                </div>
            </li>
        );
    }

    getPlayerFromID( id ) {
        return this.props.appProps.gameTracker.players.find( player => player.playerNum == id );
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

export default Player;


