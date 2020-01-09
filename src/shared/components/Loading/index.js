import React from 'react'

const Loading = ({ loading, children, full, content, local }) => {
  return loading ? (
    <>
      {full && (
        <div className="loading full">
          <div className="loading-content"></div>
        </div>
      )}
      {content && (
        <div className="loading content">
          <div className="loading-content"></div>
        </div>
      )}
      {local && (
        <div className="loading local">
          <div className="loading-content"></div>
        </div>
      )}
    </>
  ) : (
    children
  )
}

export default Loading
