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
            <li className="list-group-item list-group-item-dark d-flex justify-content-between align-items-start p-3 m-0" >
                <h1 className="col">{`Game ${this.props.game.gameNum}`}</h1>
                
                <div className="col d-flex flex-column align-items-start">
                    <div className="h4" >{ solidPlayer.playerName } </div>
                    <div className=""><b>{`Solid Player `}{ this.getStatusBadge( 'solid', game.status ) }</b></div>
                    <div>{`Select the balls sunk by ${ solidPlayer.playerName }`}</div>
                    <div className="">{ this.getBalls( game, 'solid' ) }</div>
                </div>

                <div className="col d-flex flex-column justify-content-start align-items-start">
                    <div className="h4" >{ stripedPlayer.playerName }</div>
                    <div className=""><b>{`Striped Player `}{ this.getStatusBadge( 'striped', game.status ) }</b></div>
                    <div>{`Select the balls sunk by ${ stripedPlayer.playerName }`}</div>
                    <div className="">{ this.getBalls( game, 'striped' ) }</div>
                </div>
            </li>
        );
    }

    getPlayerFromID( id ) {
        return this.props.appProps.gameTracker.players.find( player => player.playerNum == id );
    }

    getBalls( game, playerType ) {
        return (
            game.balls.map( ( ball ) => 
                <div key={ ball.ballNum } className={`form-check form-check-inline mr-0 custom-checkbox p-0 ${ !ball.player || ball.player === playerType ? '' : 'd-none' }`}>
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id={`${ playerType }PlayerBall-${ ball.ballNum }`}
                        value={`{ "gameNum": ${ game.gameNum }, "ballNum": ${ ball.ballNum }, "player": "${ playerType }" }`} 
                        checked={ ball.sunk } 
                        onChange={ this.onUpdateBall }/>
                    <label className={`form-check-label`} htmlFor={`${ playerType }PlayerBall-${ ball.ballNum }`}>{ ball.ballNum }</label>
                </div>
            )
        );
    }

    getGameStatus( game ) {
        const eightBall = game.balls.filter( ball => ball.ballNum === 8 )[0];
        const sunkenBalls = {
            striped: game.balls.filter( ball => ball.sunk && ball.type === "striped" ),
            solid: game.balls.filter( ball => ball.sunk && ball.type === "solid" )
        };
        let status = "Tied";
        if ( eightBall.sunk && eightBall.player === 'solid' && sunkenBalls.solid.length < 8 ) { status = { solid: 'Lose', striped: 'Won' } }
        if ( eightBall.sunk && eightBall.player === 'striped' && sunkenBalls.striped.length < 7 ) { status = { solid: 'Won', striped: 'Lose' } }
        if ( sunkenBalls.solid.length === 8 ) { status = { solid: 'Won', striped: 'Lose' } } 
        if ( sunkenBalls.striped.length === 7 && eightBall.sunk ) { status = { solid: 'Lose', striped: 'Won' } }
        if ( sunkenBalls.solid.length > sunkenBalls.striped.length ) { status = { solid: 'Winning', striped: 'Losing' } }
        if ( sunkenBalls.solid.length < sunkenBalls.striped.length ) { status = { solid: 'Losing', striped: 'Winning' } }
        return  status;
    }

    getStatusBadge( player, gameStatus ) {
        if( gameStatus === 'Tied' ) { return <span className={`badge badge-warning badge-pill`}>Tied</span> }

        const badges = {
            Winning: 'badge-success',
            Won: 'badge-success',
            Losing: 'badge-danger',
            Lose: 'badge-danger'
        }
        
        if( player === 'solid' ) {
            //let options = getGameStatus === 'solid' ? { badge: 'badge-success', text: 'Winning' } : { badge: 'badge-danger', text: 'Losing' }
            return <span className={`badge ${ badges[ gameStatus.solid] } badge-pill`}>{ gameStatus.solid }</span>
        }

        if( player === 'striped' ) {
            //let options = getGameStatus === 'striped' ? { badge: 'badge-success', text: 'Winning' } : { badge: 'badge-danger', text: 'Losing' }
            return <span className={`badge ${ badges[ gameStatus.striped] } badge-pill`}>{ gameStatus.striped }</span>
        }
    }
}

export default Game;


