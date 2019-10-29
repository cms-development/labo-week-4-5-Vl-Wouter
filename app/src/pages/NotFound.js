import React from "react"; 
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <section className="container -fluid -center">
        <section className="error">
            <h3>404: Not Found</h3>
            <p>The route you were looking for isn't here</p>
            <Link to='/'>Go back home</Link>
        </section>
      </section>
    )
}
