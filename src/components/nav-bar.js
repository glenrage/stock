import React, {Component} from "react";
import {Link} from 'react-router-dom';

import '../css/nav-bar.css';

class NavBar extends Component {
    render() {
        return (
            <header className='nav-bar'>
                <h1 className='nav-title'>
                    <Link to='/'>NAV</Link>
                </h1>
            </header>
        )
    }
}

export default NavBar;
