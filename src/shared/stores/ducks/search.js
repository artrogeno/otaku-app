import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  searchRequest: ['path', 'gateway', 'search'],
  searchSuccess: ['data'],
})

export const SearchTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  list: [],
  loading: true,
})

export const request = state => state.merge({ loading: true })
export const success = (state, { data }) =>
  state.merge({ loading: false, data })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEARCH_REQUEST]: request,
  [Types.SEARCH_SUCCESS]: success,
})
