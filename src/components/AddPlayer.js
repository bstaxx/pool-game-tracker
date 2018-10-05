import React, { Component } from 'react';

class AddPlayer extends Component {
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
        const newPlayer = this.props.appProps.gameTracker.newPlayer;
        return (
            <div className="AddPlayer p-3 bg-dark">
                <form className="form-inline" >
                    <div className="form-group m-0 mr-3 flex-grow-1">
                        <label htmlFor="newPlayerName" className="sr-only">New Player Name</label>
                        <input 
                            type="text" 
                            className="form-control w-100" 
                            id="newPlayerName" 
                            onChange={ this.onUpdateNewPlayerName }
                            value={ newPlayer.playerName }
                            placeholder="Enter new player name" />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={ this.onAddPlayer }
                        disabled={ !newPlayer.playerName ? true : false }
                    >Add Player</button>
                </form>
            </div>
        );
    }
}

export default AddPlayer;