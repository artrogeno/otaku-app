import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  videoRequest: ['id', 'gateway'],
  videoSuccess: ['data'],
})

export const VideoTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  data: {},
  loading: true,
})

export const request = state => state.merge({ loading: true })
export const success = (state, { data }) =>
  state.merge({ loading: false, data })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.VIDEO_REQUEST]: request,
  [Types.VIDEO_SUCCESS]: success,
})
