import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

import { getItemLS } from '@services/storage'
import { STORAGE } from '@constants/index'

const { GATEWAY_CHANNEL } = STORAGE

const { Types, Creators } = createActions({
  gatewayRequest: ['uri'],
  gatewaySuccess: ['data'],
  gatewaySelected: ['gateway'],
})

export const GatewayTypes = Types
export default Creators

const INITIAL_STATE = Immutable({
  data: getItemLS(GATEWAY_CHANNEL),
  loading: true,
})

export const request = state => state.merge({ loading: true })
export const success = (state, { data }) =>
  state.merge({ loading: false, data })
export const selected = state => state.merge({ loading: true })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GATEWAY_REQUEST]: request,
  [Types.GATEWAY_SUCCESS]: success,
  [Types.GATEWAY_SELECTED]: selected,
})
