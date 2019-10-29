import React, { Component } from 'react'
import {
    Link
} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSignInAlt, faListUl, faSignOutAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../contexts/UserContext'
import logo from '../assets/logo.png'


class Header extends Component {
    static contextType = UserContext
    render() {
        const { isLoggedIn, user, logout } = this.context
        return (
            <header className="header">
                <div className="header__logo">
                    <Link to="/"><img src={logo} alt="logo" /></Link>
                </div>
                <div className="header__links">
                    <Link to="/"><FontAwesomeIcon icon={faHome} size="2x" /></Link>
                    {isLoggedIn ? (
                        <>
                            <Link to="/admin/creatures"><FontAwesomeIcon icon={faListUl} size="2x" /></Link>
                            <Link to="/admin/creatures/add"><FontAwesomeIcon icon={faPlus} size="2x" /></Link>
                            <span className="header__user">{ user.name.charAt(0).toUpperCase() }</span>
                            <a href="/" className="btn" onClick={logout}><FontAwesomeIcon icon={faSignOutAlt} size="2x" /></a>
                        </>
                    ) : (
                        <Link to="/login"><FontAwesomeIcon icon={faSignInAlt} size="2x" /></Link>
                    )}
                </div>
            </header>
        );
    }
}

export default Header;
