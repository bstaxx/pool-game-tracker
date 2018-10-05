import React, { Component } from 'react';

class AddGame extends Component {
    constructor( props ) {
        super( props );
        this.onUpdateSolidPlayer = this.onUpdateSolidPlayer.bind( this );
        this.onUpdateStripedPlayer = this.onUpdateStripedPlayer.bind( this );
        this.onAddGame = this.onAddGame.bind( this );
        //this.onAddPlayer = this.onAddPlayer.bind( this );
    }

    onUpdateSolidPlayer( event ) { this.props.appProps.onUpdateSolidPlayer( event.target.value ) };
    onUpdateStripedPlayer( event ) { this.props.appProps.onUpdateStripedPlayer( event.target.value ) };
    onAddGame( event ) { event.preventDefault(); this.props.appProps.onAddGame(); }
    /*onAddPlayer() { 
        this.props.appProps.onAddPlayer();
        document.querySelector('#playerName').focus();
    };*/

    render() {
        return (
            <div className="AddGame p-3 bg-dark">
                <form className="">
                    <div className="row">
                        <div className="form-group m-0 mb-3 mb-lg-0 ml-3 mr-3 flex-grow-1">
                            <label htmlFor="solidPlayer" className="sr-only">Solid Player</label>
                            <select className="form-control" id="solidPlayer" onChange={ this.onUpdateSolidPlayer }>
                                <option value="">Select solid player</option>
                                { this.getOptions( 'solid' ) }
                            </select>
                        </div>
                        <div className="form-group m-0 ml-3 ml-lg-0 mr-3 flex-grow-1">
                            <label htmlFor="stripedPlayer" className="sr-only">Striped Player</label>
                            <select className="form-control" id="stripedPlayer" onChange={ this.onUpdateStripedPlayer }>
                                <option value="">Select striped player</option>
                                { this.getOptions( 'striped') }
                            </select>
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary mr-3"
                            onClick={ this.onAddGame }
                        >Add Game</button>
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
}

export default AddGame;