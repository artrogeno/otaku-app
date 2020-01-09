import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation } from 'react-i18next'

import AnimeAction from '@stores/ducks/anime'
import HeaderAction from '@stores/ducks/header'
import Loading from '@components/Loading'
import CardAnimes from '@components/CardAnimes'
import Paginate from '@components/Paginate'
import history from '@routes/history'

const Animes = props => {
  const dispatch = useDispatch()
  const { t, match } = props
  const page = match.params.page || 1
  const { data, loading } = useSelector(state => state.anime)
  const { data: dataGateway } = useSelector(state => state.gateway)

  const paginationHandler = value => {
    if (value > 0 && value <= data.pages.maxPage) {
      history.push(`/animes/${value}`)
    }
  }

  useEffect(() => {
    const fetchAnimes = async () => {
      const { gateway } = dataGateway.filter(item => item.selected === true)[0]
      await dispatch(AnimeAction.animeRequest(gateway, page))
    }
    fetchAnimes()
  }, [dispatch, dataGateway, page])

  useEffect(() => {
    const dispatchHeader = async () => {
      if (data) {
        const { title, gateway } = dataGateway.filter(
          item => item.selected === true
        )[0]
        const header = {
          title: t('ANIMES'),
          subtitle: title,
          icon: ['fas', 'ghost'],
          gateway: false,
          search: {
            gateway,
            path: 'animes',
            prefix: '',
            sufix: 'episodes',
          },
          back: true,
          history,
        }
        await dispatch(HeaderAction.headerProps(header))
      }
    }
    dispatchHeader()
  }, [data, t, dataGateway, dispatch])

  return (
    <Loading loading={loading && (!data || !data.pages)} full>
      {data ? (
        <Paginate pages={data.pages} pagnation={paginationHandler} />
      ) : null}
      <div className="container-animes">
        {data
          ? data.animes.map((item, i) => (
              <div className="container-card" key={i}>
                <CardAnimes index={i} data={item} />
              </div>
            ))
          : null}
      </div>
    </Loading>
  )
}

export default withTranslation()(Animes)
