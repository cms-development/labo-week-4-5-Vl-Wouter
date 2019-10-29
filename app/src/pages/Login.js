import React, { Component } from "react"; 
import { Redirect } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import ReactHtmlParser from 'react-html-parser'

class Login extends Component {
  static contextType = UserContext

  componentDidMount() {
    const { login } = this.context
    const btn = document.querySelector("#sendForm")
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      const username = document.querySelector('#username').value
      const pass = document.querySelector("#password").value

      login(username, pass)
    })

    /**
     * JS for a quick development login
     * ! DO NOT USE IN PRODUCTION
     */
    const quickBtn = document.querySelector('#devLogin')
    quickBtn.addEventListener('click', (e) => {
      e.preventDefault()
      login('admin', 'gdm_admin')
    })
  }

  render() {
    const { isLoggedIn, error } = this.context
    if(isLoggedIn) {
      return (
        <Redirect to="/"/>
      )
    } else {
      return (
       <main className="container -center">
         <section className="row">
           <section className="col-sm-12 col-md-4 offset-md-4">
            <form action="" className="form -card" id="loginForm">
              <h3 className="form__title">Log In.</h3>
              <p className="form__subtitle">Wizards Unite Admin</p>
              {error ? (
                <div className="form__error">
                  {ReactHtmlParser(error)}
                </div>
              ) : ("")}
              <div className="form__group">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username"/>
              </div>
              <div className="form__group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password"/>
              </div>
              <div className="form__group">
                <button id="sendForm">Log In</button>
                <button id="devLogin">Quick Dev Login</button>
              </div>
            </form>
           </section>
         </section>
       </main>
      );
    }
  }
}

export default Login;