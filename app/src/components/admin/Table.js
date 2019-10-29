import React from 'react'
import { Link } from 'react-router-dom'

export default function Table(props) {
    const { data } = props
    return (
        <table className="table">
            <thead>
                <tr>
                    <th className="right">ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, i) => (
                    <tr key={i}>
                        <td className="right">{item.id}</td>
                        <td className="center">{item.title.rendered}</td>
                        <td className="table__description">{item.content.rendered}</td>
                        <td className="actions"><Link to={"/admin/creatures/" + item.id}>Edit</Link>&nbsp;|&nbsp; <Link to={"/admin/creatures/" + item.id + "/delete"}>Delete</Link></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
