import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import queryString from 'query-string';
import { 
  updateNewPlayerName, 
  addPlayer, 
  updateSolidPlayer, 
  updateStripedPlayer, 
  addGame,
  updateBall } from './actions/gameTrackerActions';
import { Route, Redirect } from 'react-router-dom';
import Header from './components/Header'
import Games from './pages/Games';
import Players from './pages/Players';
import './App.css';

class App extends Component {

  render() {
    
    const page = this.getCurrentPage();

    return (
      <div className="App">
        <Header currentPage={ page } appProps={ this.props }></Header>
        <main><Route exact path="/" render={ () => this.getPageCompoenent( page ) } /></main>
      </div>
    );

  }

  getPageCompoenent( page ) {
    switch( page ) {
      case 'players':
        return <Players appProps={ this.props } />;
      case 'games':
        return <Games appProps={ this.props } />;
      default :
        return <Redirect to="?page=players" />;
    }
  }

  getCurrentPage() {
    return queryString.parse( this.props.router.location.search ).page;
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
  onAddGame: addGame,
  onUpdateBall: updateBall
};

export default connect( mapStateToProps, mapActionsToProps )(App);