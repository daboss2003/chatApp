import React, { useContext } from 'react'
import { AllUsersContext } from '../context/context';
import moment from 'moment';


function CommentList({ comment }) {
    const { user, timestamp, text } = comment;
    const Allusers = useContext(AllUsersContext);
    const commentUser = Allusers.find(item => item.id === user);
  return (
    <div className='bg-gray-100 rounded-lg max-w-[60%] p-3 flex items-center justify-between m-3 dark:bg-dark'>
          <figure className='basis-[12%] max-w-[50px] rounded-full overflow-hidden shrink-0'><img src={commentUser.imageUrl} alt="" className='w-full' /></figure>
            <div className='basis-[80%]'>
              <div className='flex items-center justify-between'>
                  <p className='font-bold tracking-wide text-blueColor'>{ commentUser.username}</p>
                  <p className={`text-sm`}>{ moment(timestamp).fromNow()}</p>
              </div>
              <div className='flex mt-1 items-center gap-1'>
                  <p className='tracking-wide text-sm'>{ text }</p>
              </div>
          </div>
    </div>
  )
}

export default CommentList
