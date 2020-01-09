import { call, put } from 'redux-saga/effects'
import axios from '@services/axios'

import GatewayActions from '../ducks/gateway'
import { getItemLS, setItemLS, removeItemLS } from '@services/storage'
import { STORAGE } from '@constants/index'

const { GATEWAY_CHANNEL } = STORAGE

const selectGateway = (list, gateway) => {
  return list.map(item => {
    item.selected = false
    if (item.gateway === gateway) {
      item.selected = true
    } else {
    }
    return item
  })
}

export function* gatewayRequest({ uri }) {
  try {
    const {
      data: { data },
    } = yield call(axios.get, uri)

    const gateway = selectGateway(data, null)

    removeItemLS(GATEWAY_CHANNEL)
    setItemLS(GATEWAY_CHANNEL, gateway)

    yield put(GatewayActions.gatewaySuccess(gateway))
  } catch (error) {
    console.log(error)
  }
}

export function* gatewaySelected({ gateway }) {
  try {
    let data = getItemLS(GATEWAY_CHANNEL)

    data.map(item => {
      item.selected = item.gateway === gateway ? true : false
      return item
    })

    setItemLS(GATEWAY_CHANNEL, data)

    yield put(GatewayActions.gatewaySuccess(data))
  } catch (error) {
    console.log(error)
  }
}
