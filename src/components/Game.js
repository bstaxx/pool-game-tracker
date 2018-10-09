import React, { Component } from 'react';

class Game extends Component {
    constructor( props ) {
        super( props );
        this.onUpdateBall = this.onUpdateBall.bind( this );
    }

    onUpdateBall( event ) { this.props.appProps.onUpdateBall( event.target ) }

    render() {
        const game = this.props.game;
        const solidPlayer = this.getPlayerFromID( game.players.solid );
        const stripedPlayer = this.getPlayerFromID( game.players.striped );
        return (
            <li className="list-group-item list-group-item-dark d-md-flex align-items-stretch" >

                <div className="h1 col-12 col-md-4 d-flex d-inline-flex mt-2 mb-4 align-items-center">
                    <span>{`Game ${this.props.game.gameNum}`}</span>
                </div>


                <div className="col-12 col-sm-6 col-md-4 d-inline-flex flex-column">
                    <div className="h4" >{ solidPlayer.playerName } </div>
                    <div className=""><b>{`Solid Player `}{ this.getStatusBadge( 'solid', game.status ) }</b></div>
                    <div>{`Select the balls sunk by ${ solidPlayer.playerName }`}</div>
                    <div className="mt-2 mb-4">{ this.getBalls( game, 'solid' ) }</div>
                </div>

                <div className="col-12 col-sm-6 col-md-4 d-inline-flex flex-column">
                    <div className="h4" >{ stripedPlayer.playerName }</div>
                    <div className=""><b>{`Striped Player `}{ this.getStatusBadge( 'striped', game.status ) }</b></div>
                    <div>{`Select the balls sunk by ${ stripedPlayer.playerName }`}</div>
                    <div className="mt-2 mb-4">{ this.getBalls( game, 'striped' ) }</div>
                </div>
         

                
            </li>
        );
    }

    getPlayerFromID( id ) {
        return this.props.appProps.gameTracker.players.find( player => player.playerNum.toString() === id.toString() );
    }

    getBalls( game, playerType ) {
        return (
            game.balls.map( ( ball ) => 
                <div key={ ball.ballNum } className={`form-check form-check-inline mr-0 custom-checkbox p-0 ${ !ball.player || ball.player === playerType ? '' : 'd-none' }`}>
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id={`Game-${ game.gameNum }-${ playerType }PlayerBall-${ ball.ballNum }`}
                        value={`{ "gameNum": ${ game.gameNum }, "ballNum": ${ ball.ballNum }, "player": "${ playerType }" }`} 
                        checked={ ball.sunk } 
                        onChange={ this.onUpdateBall }/>
                    <label className={`form-check-label`} htmlFor={`Game-${ game.gameNum }-${ playerType }PlayerBall-${ ball.ballNum }`}>{ ball.ballNum }</label>
                </div>
            )
        );
    }

    getStatusBadge( player, gameStatus ) {
        
        const badges = {
            Winning: 'badge-success',
            Won: 'badge-success',
            Losing: 'badge-danger',
            Lose: 'badge-danger',
            Tied: 'badge-warning'
        }

        if( gameStatus === 'Tied' ) { 
            return <span className={`badge ${ badges[ gameStatus] } badge-pill`}>{ gameStatus }</span> 
        }
        
        if( player === 'solid' ) {
            return <span className={`badge ${ badges[ gameStatus.solid] } badge-pill`}>{ gameStatus.solid }</span>
        }

        if( player === 'striped' ) {
            return <span className={`badge ${ badges[ gameStatus.striped] } badge-pill`}>{ gameStatus.striped }</span>
        }
    }
}

export default Game;


