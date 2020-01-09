import React from 'react'
import { withTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import history from '@routes/history'
import Loading from '@components/Loading'
import Search from '@components/Search'

const Header = ({ t }) => {
  const { data, loading } = useSelector(state => state.header)

  const goTo = uri => {
    history.push(uri)
  }

  return (
    <Loading loading={loading}>
      <header className={`main-header ${data.hidden ? 'header-hidden' : null}`}>
        {!data.hidden ? (
          <>
            <div className="header-info">
              {data.back ? (
                <Button
                  color="link"
                  className="btn-back"
                  onClick={() => data.history.goBack()}
                >
                  <FontAwesomeIcon icon={['fas', 'chevron-left']} />
                </Button>
              ) : null}
              <div className="text-info">
                <h1>
                  <span>{data.title}</span>
                  <small>
                    <FontAwesomeIcon icon={data.icon} />
                  </small>
                </h1>
                <h4>{data.subtitle}</h4>
              </div>
            </div>
            <div className="header-action">
              {data.search ? <Search search={data.search} /> : null}
              {data.gateway ? (
                <Button color="green" className="btn-large">
                  <FontAwesomeIcon icon={['fas', 'plus']} />
                  <span> {t('CHANGE_GATEWAY')}</span>
                </Button>
              ) : null}
              {data.route ? (
                <Button
                  color="green"
                  outline
                  className="btn-large"
                  onClick={() => goTo(data.route.link)}
                >
                  <span className="icon">
                    <FontAwesomeIcon icon={data.route.icon} />
                  </span>
                  <span> {t(data.route.title)}</span>
                </Button>
              ) : null}
            </div>
          </>
        ) : null}
      </header>
    </Loading>
  )
}

export default withTranslation()(Header)
