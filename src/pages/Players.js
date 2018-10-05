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
            .map( player => <Player key={ player.playerNum } player={ player } appProps={ this.props.appProps } /> );
    }

}

export default Players;