import React, { useContext } from 'react'
import moment from 'moment'
import {userContext} from '../context/context'

function SingleMesssage({ chat }) {
  const user = useContext(userContext);
  const { timestamp, senderId, body } = chat;
  const { type, content } = body;
  const { text, videoUrl, audioUrl, photoUrl } = content;

  let userIsSender;
  if (senderId === user.id) {
    userIsSender = true;
  }
  else {
    userIsSender = false;
  }

  return (
    <div className={` flex items-center ${userIsSender ? 'justify-end' : ' justify-start'} mb-2`}>
      <div className={`max-w-[80%] ${userIsSender ? 'bg-message text-dark' : 'bg-light text-dark dark:bg-darkLight  '}dark:text-light rounded-lg px-2 py-1 relative  shadow-md flex items-baseline  flex-col`}>
          {type === 'text' && <p className='flex items-center justify-start'>{text}</p>}
          {type === 'video' && <div className='w-full p-4'><video src={videoUrl} controls className='w-full'></video></div>}
          {type === 'photo' && <div className='w-full p-4'><img src={photoUrl} className='w-full' /></div>}
          {type === 'audio' && <div><audio src={audioUrl} controls></audio></div>}
          <p className={`text-end text-xs flex items-center justify-end pl-20 text-darkLight dark:text-light w-full`}>{moment(timestamp).fromNow()}</p>
      </div>
    </div>
  )
}

export default SingleMesssage
