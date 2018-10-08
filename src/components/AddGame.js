import React, { Component } from 'react';

class AddGame extends Component {
    constructor( props ) {
        super( props );
        this.onUpdateSolidPlayer = this.onUpdateSolidPlayer.bind( this );
        this.onUpdateStripedPlayer = this.onUpdateStripedPlayer.bind( this );
        this.onAddGame = this.onAddGame.bind( this );
    }

    onUpdateSolidPlayer( event ) { this.props.appProps.onUpdateSolidPlayer( event.target.value ) };
    onUpdateStripedPlayer( event ) { this.props.appProps.onUpdateStripedPlayer( event.target.value ) };
    onAddGame( event ) { 
        const players = document.querySelectorAll( '.player' ).forEach( player => player.value = '' );
        //console.log( players );
        event.preventDefault(); 
        this.props.appProps.onAddGame(); 
    }

    render() {
        
        return (
            <div className="AddGame p-3 bg-dark">
                <form className="">
                    <div className="d-flex align-items-start flex-column flex-sm-row align-items-end">
                        <div className="d-flex w-100">
                            <div className="form-group m-0 mr-3 flex-grow-1 mb-3 mb-sm-0">
                                <label htmlFor="solidPlayer" className="sr-only">Solid Player</label>
                                <select className="form-control player" id="solidPlayer" defaultValue="" onChange={ this.onUpdateSolidPlayer }>
                                    <option value="">Select solid player</option>
                                    { this.getOptions( 'solid' ) }
                                </select>
                            </div>
                            <div className="form-group m-0 mr-sm-3 flex-grow-1">
                                <label htmlFor="stripedPlayer player" className="sr-only">Striped Player</label>
                                <select className="form-control player" id="stripedPlayer" defaultValue="" onChange={ this.onUpdateStripedPlayer }>
                                    <option value="" >Select striped player</option>
                                    { this.getOptions( 'striped') }
                                </select>
                            </div>
                        </div>
                        <div className="align-self-stretch align-self-sm-baseline">
                            <button 
                                className="btn btn-primary w-100"
                                type="submit" 
                                onClick={ this.onAddGame }
                                disabled={ this.disableAddGame() }>Add Game</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    getOptions( playerType ) {
        const gameTracker = this.props.appProps.gameTracker;
        let match
        if ( playerType === 'solid' ) match = gameTracker.newGame.players.striped;
        if ( playerType === 'striped' ) match = gameTracker.newGame.players.solid;        
        return [ ...this.props.appProps.gameTracker.players ]
            .filter( player => player.playerNum.toString() !== match )
            .map( player => <option key={ player.playerNum } value={ player.playerNum }>{ player.playerName }</option> );
    }

    disableAddGame() {
        const players = this.props.appProps.gameTracker.newGame.players;
        if( players.solid && players.striped ) { return false; }
        return true;
    }
}

export default AddGame;