import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Header = ({ authenticated, handleNotAuthenticated }) => {

    const _handleSignInClick = () => {
        // Authenticate using via passport api in the backend
        // Open Twitter login page
        window.open('http://localhost:8000/auth/google', '_self')
    }

    const _handleLogoutClick = () => {
        // Logout using Google passport api
        // Set authenticated state to false in the Homepage component
        window.open('http://localhost:8000/auth/logout', '_self')
        handleNotAuthenticated()
    }

    return (
        <ul className='menu'>
            <li>
                <Link to='/'>Home</Link>
            </li>
            {authenticated ? (
                <li onClick={_handleLogoutClick}>Logout</li>
            ) : (
                <li onClick={_handleSignInClick}>Login</li>
            )}
        </ul>
    )
}

Header.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    handleNotAuthenticated: PropTypes.func
}

export default Header