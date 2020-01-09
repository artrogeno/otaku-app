import { call, put } from 'redux-saga/effects'
import axios from '@services/axios'

import VideoActions from '../ducks/video'

export function* videoRequest({ id, gateway }) {
  try {
    const {
      data: { data },
    } = yield call(axios.get, `/animes/${gateway}/${id}`)
    yield put(VideoActions.videoSuccess(data))
  } catch (error) {
    console.log(error)
  }
}
