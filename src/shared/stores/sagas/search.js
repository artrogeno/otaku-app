import { call, put } from 'redux-saga/effects'
import axios from '@services/axios'

import SearchActions from '../ducks/search'

export function* searchRequest({ path, gateway, search }) {
  try {
    const {
      data: { data },
    } = yield call(axios.get, `/${path}/${gateway}/search/${search}`)

    yield put(SearchActions.searchSuccess(data))
  } catch (error) {
    console.log(error)
  }
}
