import React, { Component } from "react";
import { Link } from 'react-router-dom'
import Loader from './Loader'
import Error from './Alert'
import Card from './Card'
import { getAllCreatures } from "../api";


class CardContainer extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            error: null,
            items: [],
        }
    }

    abortController = new AbortController()

    componentDidMount() {
        this._isMounted = true
        getAllCreatures({ signal: this.abortController.signal })
        .then((data) => { if(this._isMounted) this.setState({
                isLoaded: true,
                items: data
            })})
        .catch(error =>{ if(this._isMounted) this.setState({
            isLoaded: false,
            error: error,
        })})
    }

    componentWillUnmount() {
        this._isMounted = false
        this.abortController.abort()
    }

    render() {
        const {error, isLoaded, items} = this.state
        if(error) {
            return <Error type="error" error={error} />
        } else if(!isLoaded) {
            return <Loader />
        } else {
            return (
                <div className="row">
                    { items.map(function(item, i) {
                        return (
                            <div key={i} className="col-sm-12 col-md-4">
                                <Link to={"/" + item.id}>
                                    <Card data={item} />
                                </Link>
                            </div>
                        )
                    }) }
                </div>
            );
        }
    }
}

export default CardContainer;