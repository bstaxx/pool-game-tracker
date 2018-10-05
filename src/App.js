import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { updateNewPlayerName, addPlayer, updateSolidPlayer, updateStripedPlayer, addGame } from './actions/gameTrackerActions';
import { Route } from 'react-router-dom';
import Header from './components/Header'
import Games from './pages/Games';
import Players from './pages/Players';
import './App.css';

class App extends Component {
  constructor( props ) {
    super( props );
    this.onUpdateNewPlayerName = this.onUpdateNewPlayerName.bind( this );
    this.onAddPlayer = this.onAddPlayer.bind( this );
    this.onUpdateSolidPlayer = this.onUpdateSolidPlayer.bind( this );
    this.addGame = this.onAddGame.bind( this );
  }

  onUpdateNewPlayerName( event ) { this.props.onUpdateNewPlayerName( event.target.value ) };
  onAddPlayer( event ) { this.props.onAddPlayer() };
  onUpdateSolidPlayer( event ) { this.props.onUpdateSolidPlayer( event.target.value ) };
  onAddGame( event ) { this.props.onAddGame(); };

  render() {
    return (
      <div className="App">

        <Header></Header>

        <main className="">
          <Route exact path="/" render={ ( props ) => <Players appProps={ this.props } /> } />
          <Route path="/games" render={ ( props ) => <Games appProps={ this.props } /> } />
        </main>

      </div>
    );
  }

}

// Redux Map-To-Props Functions

const mapStateToProps = ( state, props ) => {
  return { gameTracker: state.gameTracker };
};

const mapActionsToProps = {
  onUpdateNewPlayerName: updateNewPlayerName,
  onAddPlayer: addPlayer,
  onUpdateSolidPlayer: updateSolidPlayer,
  onUpdateStripedPlayer: updateStripedPlayer,
  onAddGame: addGame
};

export default connect( mapStateToProps, mapActionsToProps )(App);