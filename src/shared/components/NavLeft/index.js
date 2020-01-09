import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavLeft = () => {
  return (
    <nav className="navleft">
      <div className="navleft-bread">
        <FontAwesomeIcon icon={['fas', 'frog']} size="2x" />
      </div>
      <ul>
        <li>
          <NavLink exact to="/">
            <FontAwesomeIcon icon={['fas', 'ghost']} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/manga">
            <FontAwesomeIcon icon={['fas', 'book-open']} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/filmes">
            <FontAwesomeIcon icon={['fas', 'film']} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/calendar">
            <FontAwesomeIcon icon={['fas', 'calendar']} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/dash">
            <FontAwesomeIcon icon={['fas', 'chart-pie']} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings">
            <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
          </NavLink>
        </li>
        <li className="logout">
          <NavLink to="/logout">
            <FontAwesomeIcon icon={['fas', 'power-off']} />
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavLeft
