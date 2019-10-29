import React, { Component } from "react"; 
import AdminPage from './AdminPage'
import Loader from '../../components/Loader'
import Alert from '../../components/Alert'
import Table from "../../components/admin/Table";
import { getAllCreatures } from '../../api'

class Creatures extends Component {
    state = {
        isLoaded: false,
        creatures: [],
        hasError: null,
    }

    abortController = new AbortController()

    componentDidMount() {
        getAllCreatures({ signal: this.abortController.signal })
        .then(data => this.setState({
            isLoaded: true,
            creatures: data
        }))
        .catch(err => this.setState({
            isLoaded: true,
            hasError: err
        }))
    }

    componentWillUnmount() {
        this.abortController.abort()
    }

    render() {
        const {isLoaded, creatures, hasError} = this.state
        return (
            <AdminPage>
                { isLoaded ? (hasError ? (
                    <Alert type="error" error={hasError} />
                ) : (
                    <>
                        <h1>Creatures List</h1>
                        <Table data={creatures} />
                    </>
                )) : (
                    <Loader />
                ) }
            </AdminPage>
        );
    }
}

export default Creatures;