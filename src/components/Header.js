import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    render() {
        return (
            <header className="App-header">
                
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
                    
                    <NavLink className="navbar-brand" to="/">POOL GAME TRACKER</NavLink>
                    
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav mt-2 mt-lg-0" data-toggle="collapse" data-target=".navbar-collapse.show">
                            <li className="nav-item">
                                <NavLink exact className="nav-link" to="/" activeClassName="active" >Players</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/games" activeClassName="active" >Games</NavLink>
                            </li>
                        </ul>
                    </div>

                </nav>

            </header>
        );
    }
}

export default Header;