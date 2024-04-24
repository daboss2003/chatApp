import React, {useRef, lazy, Suspense, useContext, useEffect } from 'react'
import LoaderBg from './LoaderBg';
import { RefContext, ViewContext } from '../context/context';
const Message = lazy(() => import('./Message'));
const Chat = lazy(() => import('./Chat'));



function Main() {
  const inputRef = useRef(null);
  const globalView = useContext(ViewContext) 

  useEffect(() => {
    if (window.innerWidth < 768) {
      globalView.setView('chats')
    }
  }, [])

  
  return (
    <div className='flex-1 flex md:border dark:border-blueColor border-r-0 md:rounded-xl rounded-r-none rounded-bl-none max-w-[100%] h-[76vh] md:h-[80vh]'>
      <Suspense fallback={<LoaderBg><h2 className='text-lg tracking-wide font-bold gap-4'>Loading...</h2></LoaderBg>}>
          <RefContext.Provider value={inputRef}>
            {globalView.view === 'chats' && <Message />}
            {globalView.view === 'message' && <Chat/>}
            {globalView.view === '' && <><Message /><Chat/></>} 
          </RefContext.Provider>
      </Suspense>
    </div>
  )
}

export default Main
