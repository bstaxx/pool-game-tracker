import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Leaderboard extends Component {
  constructor( props ) {
    super( props );
    this.state = {}
  }

  render() {
    return (
      <div className="Leaderboard">
        <h1>Leaderboard</h1>
      </div>
    );
  }
}

export default Leaderboard;