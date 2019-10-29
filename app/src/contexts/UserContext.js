import React, { createContext, Component } from 'react'

export const UserContext = createContext()

class UserContextProvider extends Component {

    state = {
        isLoggedIn: false,
        user: {
            name: '',
            token: '',
        },
        error: null
    }

    abortController = new AbortController()

    login = async (username, password) => {
        this.setState({error: null});
        try {
            const response = await fetch(process.env.REACT_APP_JWT_API, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                signal: this.abortController.signal
            })
            const data = await response.json()
            if(data.code) {
                this.setState({
                    isLoggedIn: false,
                    error: data.message
                })
            } else {

                this.setState({
                    isLoggedIn: true,
                    user: {
                        name: data.user_display_name,
                        token: data.token,
                    },
                    error: null,
                })
            }
        } catch (err) {
            this.setState({error: err.message})
        }
    }

    logout = (e) => {
        e.preventDefault()
        this.setState({
            isLoggedIn: false,
            user: {
                name: '',
                token: '',
            },
            error: null
        })
    }

    componentWillUnmount() {
        this.abortController.abort()
    }

    render() {
        return (
            <UserContext.Provider value={{...this.state, login: this.login, logout: this.logout}}>
                { this.props.children }
            </UserContext.Provider>
        );
    }
}

export default UserContextProvider;