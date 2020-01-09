import React from 'react'
import { NavLink } from 'react-router-dom'
import { ListGroup } from 'reactstrap'

const ListEpisode = ({ list }) => {
  return (
    <ListGroup className="episode-list">
      {list
        ? list.map(item => (
            <NavLink
              className="list-group-item"
              key={item.id}
              to={`/video/${item.id}`}
            >
              {item.title}
            </NavLink>
          ))
        : null}
    </ListGroup>
  )
}

export default ListEpisode
