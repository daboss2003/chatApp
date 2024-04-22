import React, { useContext, lazy, Suspense } from 'react'
import LoaderBg from './LoaderBg';
import { EffectContext,  ViewContext } from '../context/context';
const SendMessage = lazy(() => import('./SendMessage'));
const ShowPost = lazy(() => import('./ShowPost'));

function Chat() {
  const effect = useContext(EffectContext);
  const globalView = useContext(ViewContext)
  function handleSize() {
    if (window.innerWidth < 768) globalView.setView('chats');
    else globalView.setView('')
  }

  return (
    <div className='md:max-h-[92vh] md:h-[92vh] lg:basis-[60%] md:basis-[50%] w-full h-[82vh] '>
      <Suspense
        fallback={
        <LoaderBg>
          <h3 className='text-lg tracking-wide font-bold gap-4'>Select a message</h3>
        </LoaderBg>
        }>
        {
          effect.selectedChat === null
            ?
            <LoaderBg>
              <h3 className='text-lg tracking-wide font-bold gap-4'>Select a message</h3>
            </LoaderBg>
              :
              effect.selectedChat.type === 'message'
              ?
              <SendMessage handleSize={handleSize} selected={effect.selectedChat} />
              : effect.selectedChat.type === 'post' ?
              <ShowPost handleSize={handleSize} selected={effect.selectedChat} /> : ''
        }
      </Suspense>
    </div>
  )
}

export default Chat
