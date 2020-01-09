import React from 'react'
import Header from '@components/Header'
import NavLeft from '@components/NavLeft'

const MainLayout = props => {
  return (
    <>
      <NavLeft />
      <main className="main-container">
        <Header />
        <div className="main-wrap" id="wrapMain">
          {props.children}
        </div>
      </main>
    </>
  )
}

export default MainLayout
