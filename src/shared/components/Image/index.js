import React from 'react'
import ImgNotFound from '@images/notfound.png'

const Image = ({ src, alt = '', className }) => {
  const errorHandler = ({ target }) => {
    target.onerror = null
    target.src = ImgNotFound
  }

  return (
    <img src={src} alt={alt} className={className} onError={errorHandler} />
  )
}

export default Image
