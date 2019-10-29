import React, { Component } from "react"; 
import AdminPage from "./AdminPage";
import { getCreatureById, saveCreature } from "../../api";
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { UserContext } from '../../contexts/UserContext'
import Alert from "../../components/Alert";
import { Redirect } from 'react-router-dom'

class Creature extends Component {
    _isMounted = false
    static contextType = UserContext

    state = {
        id: null,
        action: 'add',
        creature: {},
        isLoaded: false,
        editor: null,
        isDone: false,
        hasError: false,
    }

    abortController = new AbortController()

    componentDidMount() {
        const { id } = this.props.match.params
        if (!isNaN(id)) {
            getCreatureById(id, { signal: this.abortController.signal })
            .then(res => {
                this.setState({
                    id: id,
                    action: 'edit',
                    creature: res,
                    isLoaded: true,
                    
                })
                this._isMounted = true
            })
            .catch(err => console.error(err))
        } else {
            this.setState({
                isLoaded: true,
            })
            this._isMounted = true
        }
    }

    collectData() {
        const {id, editor } = this.state
        const { user } = this.context
        const data = {
            title: document.querySelector('#name').value,
            content: editor.getData(),
            status: "publish",
        }
        saveCreature(id, data, {signal: this.abortController.signal}, user.token)
        .then(res => this.setState({
            isDone: true,
        })

        )
        .catch(err => this.setState({
            isDone: false,
            hasError: err,
        }))
    }

    componentWillUnmount() {
        this._isMounted = false
        this.abortController.abort()
    }

    render() {
        const { action, isLoaded, creature, hasError, isDone } = this.state
        if(isDone) return(
            <Redirect to="/" />
        )
        if(!hasError) {
            return (
            <AdminPage>
                <section className="row">
                    <section className="col-sm-12 col-md-8 offset-md-2">
                        { isLoaded ? (
                        <form action="" className="form -card">
                            <h1>{ action.charAt(0).toUpperCase() + action.slice(1)} Creature</h1>
                            <div className="form__group">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="creature_name" id="name" defaultValue={ creature.title ? creature.title.rendered : "" } />
                            </div>
                            <div className="form__group">
                                <label htmlFor="description">Description</label>
                                <CKEditor 
                                    editor={ClassicEditor}
                                    data=""
                                    onInit={ editor => {
                                        this.setState({
                                            editor: editor
                                        })
                                        if (creature) editor.setData(creature.content.rendered)
                                    } }
                                />
                            </div>
                            <div className="form__group">
                                <button onClick={(e) => { 
                                    e.preventDefault()
                                    this.collectData()
                                }} >Submit</button>
                            </div>
                        </form>
                        ) : (<></>) }
                    </section>
                </section>
            </AdminPage>
            );
        } else {
            return(
                <Alert type="error" error={hasError} />
            )
        }
    }
}

export default Creature;
