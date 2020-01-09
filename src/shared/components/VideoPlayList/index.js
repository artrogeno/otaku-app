import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import EpisodeAction from '@stores/ducks/episode'
import Loading from '@components/Loading'
import CardPlayList from '@components/CardPlayList'
import Image from '@components/Image'

const VideoPlayList = ({ history, playlist, match }) => {
  const idActive = match.params.id
  const dispatch = useDispatch()
  const { data: dataGateway } = useSelector(state => state.gateway)
  const { data } = useSelector(state => state.episode)
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [thumbnail, setThumbnail] = useState(null)
  const [title, setTitle] = useState(null)
  const [info, setInfo] = useState([])
  const [id, setId] = useState(null)
  const [category, setCategory] = useState(null)

  const goToVideoHandler = idEp => {
    history.push(`/video/${idEp}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!dataGateway) {
        history.push('/')
      } else {
        let { gateway } = dataGateway.filter(item => item.selected === true)[0]
        await dispatch(EpisodeAction.episodeRequest(id, category, gateway))
      }
    }
    if (id && category) {
      fetchData()
    }
  }, [id, category, history, dataGateway, dispatch])

  useEffect(() => {
    if (data.list && data.thumbnail) {
      let str = data.title.replace(/(assistir)|(online)/gi, '').trim()
      setTitle(str)
      setList(data.list)
      setThumbnail(data.thumbnail)
      setInfo(data.info)
      setLoading(data.list ? false : true)
    }
  }, [data])

  useEffect(() => {
    if (playlist && playlist.episodes) {
      const { episodes } = playlist
      setId(episodes.id)
      setCategory(episodes.category)
    }
  }, [playlist])

  return (
    <Loading loading={loading} local>
      <div className="playlist-info">
        <div className="playlist-info-thumb">
          <Image src={thumbnail} alt={title} className="img-fluid" />
        </div>
        <div className="playlist-info-desc">
          <h5>{title}</h5>
          <ul>
            {info.map((item, i) =>
              i <= 5 ? (
                <li key={i}>
                  <span>{item.key}: </span>
                  <span>{item.value}</span>
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>
      <div className="playlist-list" id="playlist">
        {list.map(item => (
          <CardPlayList
            key={item.id}
            data={item}
            active={idActive}
            action={goToVideoHandler}
          />
        ))}
      </div>
    </Loading>
  )
}

export default VideoPlayList
