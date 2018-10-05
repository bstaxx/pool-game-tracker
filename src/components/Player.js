import React, { Component } from 'react';

class Player extends Component {

  render() {
    return (
        <li className="list-group-item list-group-item-dark d-flex justify-content-between align-items-center" >
            <div className="col col-md-auto flex-md-grow-1">
                <div>{`Player ${ this.props.player.playerNum }`}</div>
                <div className="h4" >{ this.props.player.playerName }</div>
            </div>
            <div className="col col-md-auto">
                <span className="badge badge-success badge-pill">Wins</span>
                <span className={`badge badge-danger badge-pill`}>Loses</span>
            </div>
        </li>
    );
  }
}

export default Player;


