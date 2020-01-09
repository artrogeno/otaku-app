import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  headerProps: ['data'],
  headerConfig: ['data'],
})

export const HeaderTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  data: {},
  loading: true,
})

export const props = state => state.merge({ loading: true })
export const config = (state, { data }) => state.merge({ loading: false, data })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.HEADER_PROPS]: props,
  [Types.HEADER_CONFIG]: config,
})
