import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class Alert  extends Component {
    componentDidMount() {
        const closeBtn = document.querySelector('#closeAlert')
        const alert = document.querySelector("#alert")

        closeBtn.addEventListener('click', () => {
            alert.remove()
        })
    }

    render() {
        const { type, error } = this.props
        return (
            <div className={ "alert " + type } id="alert">
                <p><span className="bold">{ type.charAt(0).toUpperCase() + type.slice(1) }:</span> {error.message}</p>
                <div>
                    <button className="btn -empty" id="closeAlert" ><FontAwesomeIcon icon={faTimes} /></button>
                </div>
            </div>
        );
    }
}

export default Alert;