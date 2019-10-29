function getAllCreatures(options) {
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_BASE_API}/creature`, options)
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
}

function getCreatureById(id, options) {
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_BASE_API}/creature/${id}`, options)
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
}

function saveCreature(id, data, options, token) {
    console.log(id)
    return new Promise((resolve, reject) => {
        if(!id) {
            console.log("Adding new creature")
            console.log(data)
            fetch(`${process.env.REACT_APP_BASE_API}/creature`, {
                ...options,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer" + token,
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err))
        } else {
            fetch(`${process.env.REACT_APP_BASE_API}/creature/${id}`, {
                ...options,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer" + token,
                },
                body: JSON.stringify(data),
            })
            .then(res => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err))
        }
    })
}

function deleteCreature(id, options, token) {
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_BASE_API}/creature/${id}`, {
            ...options,
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer" + token,
            }
        })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}

export {
    getAllCreatures,
    getCreatureById,
    saveCreature,
    deleteCreature
}