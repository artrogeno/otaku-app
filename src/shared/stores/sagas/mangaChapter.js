import { call, put } from 'redux-saga/effects'
import axios from '@services/axios'

import MangaChapterActions from '../ducks/mangaChapter'

export function* mangaChapterRequest({ gateway, manga, chapter }) {
  try {
    const {
      data: { data },
    } = yield call(axios.get, `/mangas/${gateway}/${manga}/chapter/${chapter}`)

    yield put(MangaChapterActions.mangaChapterSuccess(data))
  } catch (error) {
    console.log(error)
  }
}
