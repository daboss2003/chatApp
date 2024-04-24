import React, { useContext } from 'react'
import moment from 'moment'
import { sliceWord } from '../assets/filter';
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import {
  AllUsersContext,
  EffectContext,
  userContext,
  messageContext,
  RefContext,
  ViewContext
} from '../context/context';
import db from '../firebase/firebaseConfig';
import { collection, updateDoc, doc } from 'firebase/firestore';

function List({
  messageId,
  index,
  select,
  setSelect }) {
  const globalView = useContext(ViewContext);
  const inputRef = useContext(RefContext)
  const AllUsers = useContext(AllUsersContext);
  const effect = useContext(EffectContext);
  const user = useContext(userContext);
  const AllMessage = useContext(messageContext);
  const message = AllMessage.find(item => item.id === messageId);
  const unseen = message.chat.filter(item => !item.seen).length;


  let sender;
  if (message.user1.split('/')[1] === user.id) {
    sender = AllUsers.find(item => item.id === message.user2.split('/')[1]);
  }
  else {
    sender = AllUsers.find(item => item.id === message.user1.split('/')[1]);
  }

  async function handleSelect() {
    effect.setSelectedChat({ ...message, type: 'message' });
    setSelect(index);
    inputRef.current?.focus();

    if (window.innerWidth < 768) {
      globalView.setView('message')
      globalView.setShowNav(false)
    }

    if (user.id !== sender.id) {
      const seenUpdate = message.chat.map(item => ({ ...item, seen: true }));
      const messageCollection = collection(db, "messages");
      const docRef = doc(messageCollection, message.id);
      const payload = { chat: seenUpdate, }
      try {
        await updateDoc(docRef, payload);
      }
      catch (err) {
        console.log(err);
      }
      }
  }


  if (message.chat.length <= 0) {
    return
  }


  
  return (
    <div className={`w-full max-h-[17%] overflow-hidden flex  m-1 p-3 gap-3 items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-darkLight rounded-md ${index === select ? 'dark:bg-darkLight bg-gray-200' : ''}`} onClick={handleSelect}>
          <figure className='basis-[12%] max-w-[50px] rounded-full overflow-hidden shrink-0 max-h-[50px]'><img src={sender.imageUrl} alt="" className='w-full h-full' /></figure>
          <div className='basis-[80%]'>
              <div className='flex items-center justify-between relative'>
                  <p className='font-bold tracking-wide '>{ sender.username}</p>
                  <p className={`text-sm ${message.chat[message.chat.length - 1]?.seen ? '' : 'text-blueColor'}`}>{moment(message.chat[message.chat.length - 1]?.timestamp).fromNow()}</p>
                  {user.id !== sender.id && unseen > 0 ? <p className='absolute bg-blueColor rounded-full h-[15px] w-[15px] right-2 top-[100%] text-light text-[10px] flex items-center justify-center '>{ unseen }</p> : ''}
              </div>
              <div className='flex mt-1 items-center gap-1'>
                  {
                      message.chat[message.chat.length - 1]?.seen ? 
                          <span className='text-greenLight'><IoCheckmarkDoneOutline size={16} /></span>
                          : ''
                }  
                {
                      message.chat[message.chat.length - 1]?.body.type === 'text' ?
                     <p className='text-sm text-nowrap'>{sliceWord(message.chat[message.chat.length - 1]?.body.content.text)}</p>
                     :
                     <p className='text-sm text-nowrap'>{sender.id === user.id ? 'You sent a' : `${sender.username}  sent you a`} {message.chat[message.chat.length - 1]?.body.type}</p>
                }
              </div>
          </div>
    </div>
  )
}

export default List
