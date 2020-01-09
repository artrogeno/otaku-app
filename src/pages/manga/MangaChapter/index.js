import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation } from 'react-i18next'
// import { NavLink } from 'react-router-dom'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import MangaChapterAction from '@stores/ducks/mangaChapter'
import MangaChaptersAction from '@stores/ducks/mangaChapters'
import HeaderAction from '@stores/ducks/header'
import ReadControl from '@components/ReadControl'
import SelectChapter from './components/SelectChapter'

const MangaChapter = props => {
  const dispatch = useDispatch()
  const { t, match, history } = props
  const manga = match.params.manga || null
  const chapter = match.params.chapter || null
  const { data: dataGateway } = useSelector(state => state.gateway)
  const { data, loading } = useSelector(state => state.mangaChapter)
  const { data: dataChapters } = useSelector(state => state.mangaChapters)
  const [fullscreen, setFullscreen] = useState(false)
  const [gateway, setGateway] = useState(null)
  const [titleGateway, setTitleGateway] = useState(null)

  const routeChapterHandler = idChapter => {
    history.push(`/mangas/${manga}/chapter/${idChapter}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!dataGateway) {
        history.push('/')
      } else {
        let { gateway } = dataGateway.filter(item => item.selected === true)[0]
        await dispatch(
          MangaChapterAction.mangaChapterRequest(gateway, manga, chapter)
        )
      }
    }
    fetchData()
  }, [manga, chapter, dataGateway, history, dispatch])

  useEffect(() => {
    const dispatchHeader = async () => {
      if (data) {
        const { title, gateway } = dataGateway.filter(
          item => item.selected === true
        )[0]
        setGateway(gateway)
        setTitleGateway(title)
        const header = {
          hidden: true,
        }
        await dispatch(HeaderAction.headerProps(header))
      }
    }
    dispatchHeader()
  }, [t, history, dataGateway, data, dispatch])

  useEffect(() => {
    const dispatchChapters = async () => {
      if (!dataChapters.chapters && gateway && manga) {
        await dispatch(MangaChaptersAction.mangaChaptersRequest(gateway, manga))
      }
    }
    dispatchChapters()
  }, [dataChapters, manga, gateway, dispatch])

  return (
    <div className="read-container">
      <div className="wrap-controls shadow-sm">
        <div className="chapter">
          <Button
            color="link"
            className="btn-back chapter-back"
            onClick={() => history.goBack()}
          >
            <FontAwesomeIcon icon={['fas', 'chevron-left']} />
          </Button>
          <div className="chapter-info">
            <h4>{data.title}</h4>
            <h5>{titleGateway}</h5>
          </div>
        </div>
        <div className="actions">
          <SelectChapter
            className="select-chapter"
            options={dataChapters ? dataChapters.chapters : null}
            chapter={chapter}
            routeChapter={routeChapterHandler}
          />
          <Button
            className="btn-fullscreen"
            color="dark"
            onClick={() => setFullscreen(true)}
          >
            <FontAwesomeIcon icon={['fas', 'expand']} />
          </Button>
        </div>
      </div>
      <ReadControl
        pages={data.pages}
        loading={loading}
        title={data.title}
        action={act => setFullscreen(act)}
        fullscreen={fullscreen}
        {...props}
      />
    </div>
  )
}

export default withTranslation()(MangaChapter)
