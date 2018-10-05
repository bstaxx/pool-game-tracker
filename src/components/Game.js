import React, { Component } from 'react';

class Game extends Component {

  render() {
    return (
        <li className="list-group-item list-group-item-dark d-flex justify-content-between align-items-center" >
            <div className="col col-md-auto flex-md-grow-1">
                <div>{`Player ${ this.props.game.players.solid } `}<span className="badge badge-success badge-pill">Winning</span></div>
                <div className="h4" >{ this.props.game.players.solid } </div>
                <div>{`Player ${ this.props.game.players.striped } `}<span className={`badge badge-danger badge-pill`}>Losing</span></div>
                <div className="h4" >{ this.props.game.players.striped }</div>
            </div>
            <div className="col col-md-auto">
                
                
            </div>
        </li>
    );
  }
}

export default Game;


