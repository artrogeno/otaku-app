import { put } from 'redux-saga/effects'

import HeaderActions from '../ducks/header'

export function* headerProps({ data }) {
  try {
    yield put(HeaderActions.headerConfig(data))
  } catch (error) {
    console.log(error)
  }
}
