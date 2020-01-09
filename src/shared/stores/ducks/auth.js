import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  signInRequest: ['data'],
  signInSuccess: ['token'],
  signInRedirect: [],
})

export const AuthTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  signedIn: !!localStorage.getItem('auth::token'),
  token: localStorage.getItem('auth::token') || null,
  redirect: false,
})

export const success = state => state.merge({ signedIn: true, redirect: false })
export const redirect = state => state.merge({ redirect: true })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_SUCCESS]: success,
  [Types.SIGN_IN_REDIRECT]: redirect,
})
