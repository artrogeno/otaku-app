import React from 'react'

import ImgNotFound from '@images/notfound.png'

const BackgroundImage = ({ image, children, className }) => {
  return (
    <div
      className={className}
      style={{ backgroundImage: `url('${image}'), url('${ImgNotFound}')` }}
    >
      {children ? children : null}
    </div>
  )
}

export default BackgroundImage
