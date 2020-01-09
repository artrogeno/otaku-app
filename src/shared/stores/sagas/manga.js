import { call, put } from 'redux-saga/effects'
import axios from '@services/axios'

import MangaActions from '../ducks/manga'

export function* mangaRequest({ gateway, page }) {
  try {
    const {
      data: { data },
    } = yield call(axios.get, `/mangas/${gateway}?page=${page}`)

    yield put(MangaActions.mangaSuccess(data))
  } catch (error) {
    console.log(error)
  }
}
