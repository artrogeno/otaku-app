import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  mangaRequest: ['gateway', 'page'],
  mangaSuccess: ['data'],
})

export const MangaTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  list: [],
  loading: true,
})

export const request = state => state.merge({ loading: true })
export const success = (state, { data }) =>
  state.merge({ loading: false, data })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MANGA_REQUEST]: request,
  [Types.MANGA_SUCCESS]: success,
})
