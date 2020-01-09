import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { Row, Col } from 'reactstrap'

import MangaChaptersAction from '@stores/ducks/mangaChapters'
import HeaderAction from '@stores/ducks/header'
import Loading from '@components/Loading'
import Image from '@components/Image'

const MangaChapters = props => {
  const dispatch = useDispatch()
  const { t, match, history } = props
  const manga = match.params.manga || null
  const { data: dataGateway } = useSelector(state => state.gateway)
  const { data, loading } = useSelector(state => state.mangaChapters)

  useEffect(() => {
    const fetchData = async () => {
      if (!dataGateway) {
        history.push('/')
      } else {
        let { gateway } = dataGateway.filter(item => item.selected === true)[0]
        await dispatch(MangaChaptersAction.mangaChaptersRequest(gateway, manga))
      }
    }
    fetchData()
  }, [manga, dataGateway, history, dispatch])

  useEffect(() => {
    const dispatchHeader = async () => {
      if (data) {
        const { title } = dataGateway.filter(item => item.selected === true)[0]
        const header = {
          title: t('MANGA'),
          subtitle: title,
          icon: ['fas', 'book-open'],
          gateway: false,
          back: true,
          history,
        }
        await dispatch(HeaderAction.headerProps(header))
      }
    }
    dispatchHeader()
  }, [t, history, data, dataGateway, dispatch])

  return (
    <Loading loading={loading} content>
      <div className="mangachapters-container">
        <Row className="manga-wrapper">
          <Col md={4} className="wrap-left">
            <h3 className="title">{data.title}</h3>
          </Col>
          <Col md={4} className="wrap-center">
            <Image src={data.thumbnail} alt={data.title} />
          </Col>
          <Col md={4} className="wrap-right">
            <div className="wrapper">
              <h3 className="category"># {t('MANGA')}</h3>
              <div className="description">
                <table>
                  <tbody>
                    {data.info &&
                      data.info.map((item, i) => (
                        <tr key={i}>
                          <th scope="row">{item.title}: </th>
                          <td>{item.description}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Col>
          <Col md={10} className="wrap-summary">
            <div className="summary">
              <h4>{t('SYNOPSIS')}</h4>
              <p>{data.summary}</p>
            </div>
          </Col>
        </Row>

        <div className="list-wrapper">
          <nav>
            {data.chapters &&
              data.chapters.map((item, i) => (
                <NavLink
                  key={i}
                  to={`/mangas/${manga}/chapter/${item.chapter}`}
                >
                  {item.label}
                </NavLink>
              ))}
          </nav>
        </div>
      </div>
    </Loading>
  )
}

export default withTranslation()(MangaChapters)
