import Header from './Header'
import PropTypes from 'prop-types'
import React, { useState, useEffect, useCallback } from 'react'

const Homepage = () => {
    const [user, setUser] = useState({})
    const [error, setError] = useState(null)
    const [authenticated, setAuthenticated] = useState(false)

    const getAuthenticate = useCallback(
      () => {
        fetch('http://localhost:8000/auth/login/success', {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            }
        })
            .then((res) => {
                if (res.status === 200) return res.json()
                throw new Error('Failed to authenticate user')
            })
            .then((resJson) => {
                setAuthenticated(true)
                setUser(resJson.user)
            })
            .catch((err) => {
                setAuthenticated(false)
                setError('Failed to authenticate user')
            })
      },
      [],
    )

    useEffect(() => {
        getAuthenticate()
    }, [getAuthenticate])

    const _handleNotAuthenticated = () => {
        setAuthenticated(false)
    }

    return (
        <div>
            <Header
                authenticated={authenticated}
                handleNotAuthenticated={_handleNotAuthenticated}
            />
            <div>
                {!authenticated ? (
                    <h1>Welcome!</h1>
                ) : (
                    <div>
                        <h1>You've login successfully!</h1>
                        <h2>Welcome {user.name}!</h2>
                        <p>Your screen name is {user.screenName}</p>
                        <img src={user.avatar} alt={user.screenName}/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Homepage