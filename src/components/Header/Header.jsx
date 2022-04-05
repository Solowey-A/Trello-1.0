import React from 'react';
import boardSvg from "../../assets/img/icons8-trello.svg";
import logo from "../../assets/img/trello-official.svg";

import './Header.scss';

const Header = () => {
    return (
        <header className="App-header">
            <button className="App-boards-button"><img src={boardSvg} alt="boards"/>Boards</button>
            <img src={logo} className="App-logo" alt="logo" />
            <button className="App-login-button">Login</button>
        </header>
    );
};

export default Header;