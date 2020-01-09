import React from 'react'
import { call, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { toast } from 'react-toastify'

import axios from '@services/axios'
import { decode as jwt } from '@pipes/jwt-decode'
import { ROUTE, STORAGE } from '@constants/index'
import Translater from '@components/Translater'
import AuthActions from '@stores/ducks/auth'

export function* signIn({ data }) {
  try {
    const {
      data: { token, messages },
    } = yield call(axios.post, '/auth/signin', data)
    const jsonPayload = jwt(token)
    const expiresAt = jsonPayload.exp * 1000 + new Date().getTime()

    localStorage.setItem(STORAGE.AUTH_TOKEN, token)
    localStorage.setItem(STORAGE.AUTH_EXPIREAT, expiresAt)

    toast.success(<Translater message={messages} />)
    yield put(AuthActions.signInSuccess())
    yield put(push(ROUTE.REDIRECT))
  } catch (error) {
    toast.error(<Translater message={error} />)
  }
}

export function* redirect() {
  yield put(push(ROUTE.LOGIN))
}

export const isAthenticated = () => {
  if (!expires()) {
    localStorage.removeItem(STORAGE.AUTH_TOKEN)
    localStorage.removeItem(STORAGE.AUTH_EXPIREAT)
    put(push(ROUTE.REDIRECT))
  }
}

const expires = () => {
  const expiresAt = localStorage.getItem(STORAGE.AUTH_EXPIREAT) || 0
  return new Date().getTime() < parseInt(expiresAt)
}
