import React from 'react'
import logo from '../assets/logo.png'

const Card = (props) => {
    const { data } = props
    return (
        <div className="card">
            <div className="card__image">
                { data.acf.image ? (
                    <img src={ data.acf.image.url } alt={ data.acf.image.title } />
                ) : (
                    <img src={logo} alt="Logo" />
                ) }
            </div>
            <div className="card__content">
                <h1 className="card__title">{ data.title.rendered }</h1>
            </div>
        </div>
    )
}

export default Card
