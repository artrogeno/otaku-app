import React from 'react'
import { Table } from 'reactstrap'

const CardAbout = ({ title, info, summary }) => {
  return (
    <div className="card-about">
      <h3 className="title">{title}</h3>
      <Table dark>
        <tbody>
          {info.map((item, i) => (
            <tr key={i}>
              <th>{item.key}</th>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p className="summary">{summary}</p>
    </div>
  )
}

export default CardAbout
