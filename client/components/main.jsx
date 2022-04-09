import React from 'react'

import Head from './head'
import Header from './header'

const Main = () => {
  return (
    <div className="flex flex-col h-screen">
      <Head title="Tasks" />
      <Header />
      <div className="flex flex-col justify-center items-center h-full bg-gray-500">
        <div className="text-white text-xl">hello</div>
      </div>
    </div>
  )
}

Main.propTypes = {}

export default React.memo(Main)
