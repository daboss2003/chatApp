import React, { useEffect, useRef, useState, lazy, Suspense } from 'react'
import LoaderBg from './LoaderBg';
import { ViewContext, RefContext } from '../context/context';
const Message = lazy(() => import('./Message'));
const Chat = lazy(() => import('./Chat'));



function Main() {
  const [view, setView] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    window.addEventListener('resize', handleWidth);
    window.addEventListener('DOMContentLoaded', handleWidth);
    return () => {
      window.removeEventListener('DOMContentLoaded', handleWidth);
      window.removeEventListener('resize', handleWidth);
    }
  },[view]);

  function handleWidth() {
    if (window.innerWidth < 768) setView('chats');
    else setView('');
  }
  return (
    <div className='flex-1 flex md:border dark:border-blueColor border-r-0 md:rounded-xl rounded-r-none rounded-bl-none max-w-[100%]'>
      <Suspense fallback={<LoaderBg><h2 className='text-lg tracking-wide font-bold gap-4'>Loading...</h2></LoaderBg>}>
        <ViewContext.Provider value={{ view, setView }}>
          <RefContext.Provider value={inputRef}>
            {view === 'chats' && <Message />}
            {view === 'message' && <Chat/>}
            {view === '' && <><Message /><Chat/></>} 
          </RefContext.Provider>
        </ViewContext.Provider>
      </Suspense>
    </div>
  )
}

export default Main
