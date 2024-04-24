import React from 'react'
import loaderPic from '/img/chat.png'

function LoaderBg({children}) {
  return (
    <div className='w-full h-full flex items-center justify-center animate-pulse flex-col'>
          <figure className='w-[20%] '><img src={loaderPic} alt="" className='w-full' /></figure>
          {children}
    </div>
  )
}

export default LoaderBg
