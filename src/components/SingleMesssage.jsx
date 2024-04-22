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
    <div className={` flex items-center ${userIsSender ? 'justify-end' : ' justify-start'} mb-3`}>
      <div className={`max-w-[50%] ${userIsSender ? 'bg-blueColor text-light message__user' : 'bg-light text-darkLight dark:bg-darkLight dark:text-light message'} rounded-lg p-2 relative after:absolute after:bg-inherit after:h-[30px] after:w-[20px] `}>
          {type === 'text' && <p>{text}</p>}
          {type === 'video' && <div className='w-full p-4'><video src={videoUrl} controls className='w-full'></video></div>}
          {type === 'photo' && <div className='w-full p-4'><img src={photoUrl} className='w-full' /></div>}
          {type === 'audio' && <div><audio src={audioUrl} controls></audio></div>}
          <p className={`text-end text-sm font-medium ${userIsSender ? 'text-light' : 'text-blueColor'}`}>{moment(timestamp).fromNow()}</p>
      </div>
    </div>
  )
}

export default SingleMesssage
