import React, { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CardPlayList = ({ active, action, data: { title, id } }) => {
  const activeRef = useRef(null)

  const scrollToRef = () => {
    setTimeout(() => {
      if (activeRef.current) {
        activeRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        })
      }
    }, 1000)
  }

  const setClassCard = () => {
    const classes = ['card-playlist']
    if (active === id) {
      classes.push('active')
      scrollToRef()
    }
    return classes.join(' ')
  }

  return (
    <button
      className={setClassCard()}
      ref={activeRef}
      onClick={() => action(id)}
    >
      <div className="card-body">
        <span className="icon">
          <FontAwesomeIcon icon={['fas', 'play']} />
        </span>
        <span className="info">{title}</span>
      </div>
    </button>
  )
}

export default CardPlayList
