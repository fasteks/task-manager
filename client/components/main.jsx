import React from 'react'

import Head from './head'
import Header from './header'

const Main = () => {
  return (
    <div>
      <Head title="Tasks" />
      <Header />
      <div className="flex flex-col justify-center items-center h-screen">hello</div>
    </div>
  )
}

Main.propTypes = {}

export default React.memo(Main)
