import React from 'react'
import { withTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { UncontrolledTooltip } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CardAnimes = ({ data, index, t }) => {
  return (
    <div className="card-animes">
      <div className="wrap shadow-sm">
        <div className="wrap-header">
          <div className="post">
            <span className="icon">
              <FontAwesomeIcon icon={['far', 'clock']} />
            </span>
            <span>{data.date}</span>
          </div>
        </div>
        <div className="wrap-body">
          <div
            className="image-cover"
            style={{ background: `url('${data.image}')` }}
          >
            <NavLink className="body-play" to={`/video/${data.id}`}>
              <span className="icon">
                <FontAwesomeIcon icon={['fas', 'play']} />
              </span>
            </NavLink>
          </div>
          <div className="title">
            <h5 id={`UncontrolledTooltipAnime-${index}`}>{data.title}</h5>
            <UncontrolledTooltip
              placement="right"
              target={`UncontrolledTooltipAnime-${index}`}
            >
              {data.title}
            </UncontrolledTooltip>
          </div>
        </div>
        <NavLink
          className="wrap-footer"
          to={`/episodes/${data.episodes.id}/${data.episodes.category}`}
        >
          <div className="all-eps">
            <span className="icon">
              <FontAwesomeIcon icon={['fas', 'play']} />
            </span>
            <span className="text">{t('ALL_EPISODES')}</span>
          </div>
        </NavLink>
      </div>
    </div>
  )
}

export default withTranslation()(CardAnimes)
