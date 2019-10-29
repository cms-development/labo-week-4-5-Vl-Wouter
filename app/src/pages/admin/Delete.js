import React, { Component } from "react"; 
import AdminPage from "./AdminPage";
import { getCreatureById, deleteCreature } from "../../api";
import { Redirect } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'

class Delete extends Component {
    static contextType = UserContext
    _isMounted = false
    state = {
        creature: null,
        isLoaded: false,
    }

    abortController = new AbortController()

    constructor(props) {
        super(props)
        const { id } = props.match.params
        this._isMounted = true
        getCreatureById(id, { signal: this.abortController.signal })
        .then(res => this.setState({
            creature: res,
            isLoaded: true,
        }))
    }

    componentWillUnmount() {
        this._isMounted = false
        this.abortController.abort()
    }
    render() {
        const { creature, isLoaded } = this.state
        const { history } = this.props
        const { user } = this.context
        return (
            <AdminPage>
                {isLoaded ? (
                    <section className="row">
                        <section className="col-sm-12 col-md-6 offset-md-3">
                            <h1>Delete a creature</h1>
                            <p>Are you sure you want to delete { creature.title.rendered }?</p>
                            <button onClick={(e) => {
                                e.preventDefault()
                                deleteCreature(creature.id, { signal: this.abortController.signal }, user.token)
                                .then(res =>{
                                    history.goBack()
                                })
                                .catch(err => console.error(err))
                            }}>Yes</button>
                            <button onClick={() => {this.props.history.goBack()}}>Cancel</button>
                        </section>
                    </section>
                ) : (
                    ""
                )}
            </AdminPage>
        );
    }
}

export default Delete;