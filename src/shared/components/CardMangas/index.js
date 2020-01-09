import React from 'react'
import { withTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { Badge } from 'reactstrap'

import BackgroundImage from '@components/BackgroundImage'

const CardMangas = ({ data, t }) => {
  return (
    <div className="container-card">
      <div className="card-mangas">
        <BackgroundImage className="full-background" image={data.image} />
        <div className="card-body">
          <div className="content-top">
            {data.labels.map((item, i) => (
              <Badge color={item.type} key={i}>
                {item.label}
              </Badge>
            ))}
          </div>

          <div className="content-bottom">
            <h6>{t('MANGA')}</h6>
            <NavLink to={`/mangas/${data.manga}/chapters`}>
              <h4 className="card-title">{data.title}</h4>
            </NavLink>
            <nav>
              {data.chapters.map((item, i) => (
                <NavLink
                  to={`/mangas/${data.manga}/chapter/${item.id}`}
                  key={i}
                >
                  <span>{item.id}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withTranslation()(CardMangas)
