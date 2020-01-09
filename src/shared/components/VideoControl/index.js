import React, { useState, useEffect } from 'react'
import { withTranslation } from 'react-i18next'
import { Button, ButtonGroup } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Loading from '@components/Loading'

const VideoControl = ({
  t,
  history,
  sources: sourcesUrl,
  info,
  loading: loadingReq,
}) => {
  const [videoStream, setVideoStream] = useState(null)
  const [loading, setLoading] = useState(true)
  const [episodes, setEpisodes] = useState(null)
  const [prev, setPrev] = useState(null)
  const [next, setNext] = useState(null)
  const [sources, setSources] = useState([])

  const chooseHandler = src => {
    setVideoStream(src)
  }

  const goToVideoHandler = ({ id }) => {
    history.push(`/video/${id}`)
  }

  const goEpisodesHandler = ({ id, category }) => {
    history.push(`/episodes/${id}/${category}`)
  }

  const getToNextEpisodeHandler = () => {
    if (next) {
      goToVideoHandler(next)
    }
  }

  useEffect(() => {
    if (!loadingReq && sources && info) {
      setVideoStream(sources[0])
      setLoading(false)
      setEpisodes(info.episodes)
      setPrev(info.prev)
      setNext(info.next)
      setSources(sourcesUrl)
    } else {
      setLoading(true)
    }
  }, [loadingReq, sources, info, sourcesUrl])

  return (
    <Loading loading={loading} local>
      <div className="menu-control">
        <ButtonGroup size="sm">
          {sources.map((item, i) => (
            <Button
              outline
              color="green"
              key={i}
              onClick={() => chooseHandler(item)}
              className={item === videoStream ? 'active' : ''}
            >
              {t('VIDEO')} {` 0${i + 1}`}
            </Button>
          ))}
        </ButtonGroup>

        <ButtonGroup size="md">
          {prev ? (
            <Button color="green" onClick={() => goToVideoHandler(prev)}>
              <span>
                <FontAwesomeIcon icon={['fas', 'fast-backward']} />
              </span>
            </Button>
          ) : null}

          {next ? (
            <Button color="green" onClick={() => goToVideoHandler(next)}>
              <span>
                <FontAwesomeIcon icon={['fas', 'fast-forward']} />
              </span>
            </Button>
          ) : null}

          {episodes ? (
            <Button color="green" onClick={() => goEpisodesHandler(episodes)}>
              <span>
                <FontAwesomeIcon icon={['fab', 'buffer']} />
              </span>
            </Button>
          ) : null}
        </ButtonGroup>
      </div>
      <div className="wrap-video">
        <video
          controls
          src={videoStream}
          autoPlay
          onEnded={getToNextEpisodeHandler}
        />
      </div>
    </Loading>
  )
}

export default withTranslation()(VideoControl)
