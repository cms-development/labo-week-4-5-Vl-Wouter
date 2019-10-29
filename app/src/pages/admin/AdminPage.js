import React, {
    Component
} from "react"
import {
    UserContext
} from '../../contexts/UserContext'
import {
    Redirect
} from 'react-router-dom'

class AdminPage extends Component {
    static contextType = UserContext
    render() {
        const { isLoggedIn } = this.context
        if(isLoggedIn) {
            return ( 
                <main className = "container -top" > 
                    { this.props.children }
                </main>
            );
        } else {
            return (
                <Redirect to="/" />
            )
        }
    }
}

export default AdminPage;