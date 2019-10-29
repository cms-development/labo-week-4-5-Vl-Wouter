import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import Loader from '../components/Loader'
import '../sass/pages/_detail.scss'
import Alert from '../components/Alert'
import { getCreatureById } from '../api'
import logo from '../assets/logo.png'

export default function Detail() {
    let { id } = useParams()
    const [hasError, setErrors] = useState(false)
    const [creatures, setCreatures] = useState({})
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (isNaN(id)) {
            setErrors({
                message: "Please enter a valid ID"
            })
            setLoaded(true)
        } else {
            getCreatureById(id)
            .then((data) => {
                setCreatures(data)
                setLoaded(true)
            })
            .catch(err => setErrors(err))
        }
    }, [id, loaded])

    return (
        <div className="container">
            {loaded ? ( hasError ? (
                <Alert type="error" error={hasError} />
            ) : (
                <section className="creature">
                    <div className="creature__image">
                    { creatures.acf.image ? (
                        <img src={ creatures.acf.image.url } alt={ creatures.acf.image.title } />
                    ) : (
                        <img src={logo} alt="Logo" />
                    ) }
                    </div>
                    <div className="creature__content">
                        <h1 className="creature__contentTitle">{ creatures.title.rendered }</h1>
                        { ReactHtmlParser(creatures.content.rendered) }
                    </div>
                </section>
            )) : (
                <Loader />
            )}
        </div>
    )
}
