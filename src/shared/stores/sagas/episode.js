import { call, put } from 'redux-saga/effects'
import axios from '@services/axios'

import EpisodeActions from '../ducks/episode'

export function* episodeRequest({ id, category, gateway }) {
  try {
    const {
      data: { data },
    } = yield call(axios.get, `/animes/${gateway}/${id}/${category}`)

    yield put(EpisodeActions.episodeSuccess(data))
  } catch (error) {
    console.log(error)
  }
}
