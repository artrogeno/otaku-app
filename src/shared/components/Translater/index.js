import React from 'react'
import { Translation } from 'react-i18next'

const Translater = ({ message }) => (
  <Translation>{t => <p>{t(message)}</p>}</Translation>
)

export default Translater
