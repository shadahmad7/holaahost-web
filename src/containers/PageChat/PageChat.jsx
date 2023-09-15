import React from 'react'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import './style.scss'
const PageChat = () => {
  return (
    <div className='home'>
      <div className="container new-container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default PageChat