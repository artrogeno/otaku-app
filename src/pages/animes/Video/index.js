import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation } from 'react-i18next'

import VideoAction from '@stores/ducks/video'
import HeaderAction from '@stores/ducks/header'
import VideoControl from '@components/VideoControl'
import VideoPlayList from '@components/VideoPlayList'

const Video = props => {
  const id = props.match.params.id || null
  const { history } = props
  const dispatch = useDispatch()
  const { data: dataGateway } = useSelector(state => state.gateway)
  const { data, loading } = useSelector(state => state.video)
  const [video, setVideo] = useState(null)
  const [info, setInfo] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!dataGateway) {
        history.push('/')
      } else {
        let { gateway } = dataGateway.filter(item => item.selected === true)[0]
        await dispatch(VideoAction.videoRequest(id, gateway))
      }
    }
    fetchData()
  }, [id, dataGateway, history, dispatch])

  useEffect(() => {
    const dispatchHeader = async () => {
      if (data) {
        const { title } = dataGateway.filter(item => item.selected === true)[0]
        const header = {
          title: data.info ? data.info.title : null,
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
        setVideo(data.videos)
        setInfo(data.info)
      }
    }
    dispatchHeader()
  }, [data, history, dataGateway, dispatch])

  return (
    <div className="video-container">
      <div className="player">
        <VideoControl
          sources={video}
          info={info}
          {...props}
          loading={loading}
        />
      </div>
      <div className="playlist">
        <VideoPlayList playlist={info} {...props} />
      </div>
    </div>
  )
}

export default withTranslation()(Video)
