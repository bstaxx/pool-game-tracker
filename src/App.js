import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import queryString from 'query-string';
import { 
  updateNewPlayerName, 
  addPlayer, 
  updateSolidPlayer, 
  updateStripedPlayer, 
  addGame,
  updateBall,
  initPages } from './actions/gameTrackerActions';
import { Route } from 'react-router-dom';
import Header from './components/Header'
import Games from './pages/Games';
import Players from './pages/Players';
import './App.css';

class App extends Component {

  constructor( props ) {
    super( props );
    this.onInitPages = this.onInitPages.bind( this );
  }

  onInitPages( pages ) { this.props.onInitPages( pages ) }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className="App">

        <Header></Header>

        <main className="">
          <Route exact path="/" render={ () => this.getPageCompoenent() } />
          
        </main>

      </div>
    );
  }

  getPageCompoenent() {
    const page = queryString.parse( this.props.router.location.search ).page;
    console.log( page );
    switch( page ) {
      case 'games':
        return <Games appProps={ this.props } />;
      default :
        return <Players appProps={ this.props } />;
    }
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
  onUpdateBall: updateBall,
  onInitPages: initPages
};

export default connect( mapStateToProps, mapActionsToProps )(App);