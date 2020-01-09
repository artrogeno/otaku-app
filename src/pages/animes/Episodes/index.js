import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation } from 'react-i18next'
import { Row, Col } from 'reactstrap'

import EpisodeAction from '@stores/ducks/episode'
import HeaderAction from '@stores/ducks/header'
import Loading from '@components/Loading'
import Image from '@components/Image'
import CardAbout from './components/CardAbout'
import ListEpisode from './components/ListEpisode'

const Episodes = props => {
  const id = props.match.params.id || null
  const category = props.match.params.category || null
  const { history } = props
  const dispatch = useDispatch()
  const { data: dataGateway } = useSelector(state => state.gateway)
  const { data, loading } = useSelector(state => state.episode)

  useEffect(() => {
    const fetchData = async () => {
      if (!dataGateway) {
        history.push('/')
      } else {
        let { gateway } = dataGateway.filter(item => item.selected === true)[0]
        await dispatch(EpisodeAction.episodeRequest(id, category, gateway))
      }
    }
    fetchData()
  }, [id, category, dataGateway, history, dispatch])

  useEffect(() => {
    const dispatchHeader = async () => {
      if (data) {
        const { title } = dataGateway.filter(item => item.selected === true)[0]
        const header = {
          title: data.title,
          subtitle: title,
          icon: ['fas', 'layer-group'],
          gateway: false,
          back: true,
          route: {
            link: '/animes/1',
            title: 'GO_TO_ANIMES',
            icon: ['fas', 'undo-alt'],
          },
          history,
        }
        await dispatch(HeaderAction.headerProps(header))
      }
    }
    dispatchHeader()
  }, [data, history, dataGateway, dispatch])

  return (
    <Loading loading={loading} content>
      <Row className="episode-container">
        <Col md={3} className="wrap-img">
          <Image src={data.thumbnail} alt={data.title} className="img-fluid" />
        </Col>
        <Col md={{ size: 8, order: 2 }} className="wrap-info">
          <CardAbout
            title={data.title}
            info={data.info}
            summary={data.summary}
          />
          <ListEpisode list={data.list} />
        </Col>
      </Row>
    </Loading>
  )
}

export default withTranslation()(Episodes)
