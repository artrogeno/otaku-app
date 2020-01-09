import { call, put } from 'redux-saga/effects'
import axios from '@services/axios'

import MangaChaptersActions from '../ducks/mangaChapters'

export function* mangaChaptersRequest({ gateway, manga }) {
  try {
    const {
      data: { data },
    } = yield call(axios.get, `/mangas/${gateway}/${manga}`)

    yield put(MangaChaptersActions.mangaChaptersSuccess(data))
  } catch (error) {
    console.log(error)
  }
}
