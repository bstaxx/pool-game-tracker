import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

    render() {
        const currentPage = this.props.currentPage;
        return (
            <header className="App-header">
                
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
                    
                    <b className="navbar-brand text-info" to="/">POOL GAME TRACKER</b>
                    
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav mt-2 mt-lg-0" data-toggle="collapse" data-target=".navbar-collapse.show">
                            <li className="nav-item">
                                <Link className={`nav-link ${ currentPage === 'players' ? 'active' : null }`} to="?page=players" >Players</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${ currentPage === 'games' ? 'active' : null }`} to="?page=games" >Games</Link>
                            </li>
                        </ul>
                    </div>

                </nav>

            </header>
        );
    }
}

export default Header;