// Hook to fetch a single creature from the api
import { useState, useEffect } from 'react'

function useFetch(id) {
    // Declare variables
    const [data, setData] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    const [hasError, setError] = useState(false)


    useEffect(() => {
        async function fetchUrl() {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_API}creature/${id}`)
                const json = await response.json()
    
                setData(json)
                setLoaded(true)
            } catch(error) {
                setError(error)
                setLoaded(true)
            }
        }

        fetchUrl()
    },[id, isLoaded])
    
    return [data, isLoaded, hasError]
}

export { useFetch };