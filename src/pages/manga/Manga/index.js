import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation } from 'react-i18next'

import MangaAction from '@stores/ducks/manga'
import HeaderAction from '@stores/ducks/header'
import Loading from '@components/Loading'
import CardMangas from '@components/CardMangas'
import Paginate from '@components/Paginate'

const Manga = props => {
  const dispatch = useDispatch()
  const { t, match, history } = props
  const page = match.params.page || 1
  const { data, loading: loadingManga } = useSelector(state => state.manga)
  const { data: dataGateway } = useSelector(state => state.gateway)
  const [loading, setLoading] = useState(true)
  const [pages, setPages] = useState({})
  const [mangas, setMangas] = useState([])

  const paginationHandler = value => {
    if (value > 0 && value <= data.pages.maxPage) {
      history.push(`/mangas/launch/${value}`)
    }
  }

  useEffect(() => {
    const fetchAnimes = async () => {
      const { gateway } = dataGateway.filter(item => item.selected === true)[0]
      await dispatch(MangaAction.mangaRequest(gateway, page))
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
          title: t('MANGA'),
          subtitle: title,
          icon: ['fas', 'book-open'],
          gateway: false,
          back: true,
          search: {
            gateway,
            path: 'mangas',
            prefix: 'chapters',
            sufix: 'mangas',
          },
          history,
        }
        await dispatch(HeaderAction.headerProps(header))
      }
    }
    dispatchHeader()
  }, [data, t, history, dataGateway, dispatch])

  useEffect(() => {
    if (!loadingManga && data && data.pages) {
      setPages(data.pages)
      setMangas(data.mangas)
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [loadingManga, data])

  return (
    <Loading loading={loading} content>
      <Paginate pages={pages} pagnation={paginationHandler} />

      <div className="container-mangas">
        {mangas.map((item, i) => (
          <CardMangas data={item} key={i} />
        ))}
      </div>
    </Loading>
  )
}

export default withTranslation()(Manga)
