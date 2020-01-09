import React from 'react'
import { withTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'reactstrap'

import GatewayAction from '@stores/ducks/gateway'

const CardGateway = ({ t, history, data, route }) => {
  const dispatch = useDispatch()

  const selectdHandle = async () => {
    await dispatch(GatewayAction.gatewaySelected(data.gateway))
    history.push(route)
  }

  return (
    <div className={`card-gateway card ${!data.working ? 'disabled' : null}`}>
      <div className="card-header">
        <span className="badge-default badge badge-secondary">
          {data.working ? t('ITS_WORKING') : t('ITS_NOT_WORKING')}
        </span>
        <h1 className="card-title">{data.title}</h1>
        <h5>{t('LSIT_ALL_ANIMES')}</h5>
      </div>
      <div className="card-body">
        <ul>
          <li>
            <span>
              <FontAwesomeIcon icon={['fas', 'link']} />
            </span>
            {data.url}
          </li>
          <li>
            <span>
              <FontAwesomeIcon icon={['far', 'play-circle']} />
            </span>
            {t('MANY_PLAYS')}
          </li>
          <li>
            <span>
              <FontAwesomeIcon icon={['fas', 'database']} />
            </span>
            {t('NO_DATABASE')}
          </li>
        </ul>
        <Button
          color="green"
          className="mt-4 btn-large"
          onClick={selectdHandle}
          disabled={!data.working}
        >
          {t('GET_START')}
        </Button>
      </div>
    </div>
  )
}

export default withTranslation()(CardGateway)
