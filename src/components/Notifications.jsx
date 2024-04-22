import React, { useState } from 'react'
import { NotificationContext, userContext } from '../context/context'
import { useContext } from 'react'
import SingleNote from './SingleNote';

function Notifications() {
  const Notification = useContext(NotificationContext);
  const user = useContext(userContext);
  const notifications = Notification.filter(item => item.user === user.id);
  const [select, setSelect] = useState('');


  return (
    <div className='relative  h-full '>
      <h2 className='font-bold text-xl tracking-wide text-blueColor md:px-2 px-8 mb-4'>Notifications</h2>
      <div className='overflow-y-auto overflow-x-hidden sm:h-[85%] h-[82%]'>
        { notifications.length > 0 ?
          notifications.map((item, i) => <SingleNote key={item.id} note={item} index={i} select={select} setSelect={setSelect} />)  : <h2>You have no Notification</h2>  
        }
      </div>
    </div>
  )
}

export default Notifications
