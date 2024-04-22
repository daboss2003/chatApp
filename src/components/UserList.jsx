import React, { useContext } from 'react'
import {
  AllUsersContext,
  messageContext,
  userContext,
  EffectContext,
  ViewContext
} from '../context/context';
import db from '../firebase/firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';




function UserList({ userId, index, select, setSelect, }) {
  const AllUsers = useContext(AllUsersContext);
  const globalMessage = useContext(messageContext);
  const globalUser = useContext(userContext);
  const effect = useContext(EffectContext);
  const globalView = useContext(ViewContext)
  const user = AllUsers.find(item => item.id === userId);
  const messageExist = globalMessage.find(item => item.user1 === `users/${globalUser.id}` && item.user2 === `users/${user.id}` || item.user2 === `users/${globalUser.id}` && item.user1 === `users/${user.id}`);


  async function handleClick() {
    setSelect(index);
    if (messageExist) {
      effect.setSelectedChat({ ...messageExist, type: 'message' });
      if (window.innerWidth < 768) globalView.setView('message');
      else globalView.setView('');
    }
    else {
      const payload = {
        user1: `users/${globalUser.id}`,
        user2: `users/${user.id}`,
        chat: [],
        archived: false,
        starred: false,
      };
      const id = crypto.randomUUID()
      const messageCollection = collection(db, "messages");
      const docRef = doc(messageCollection, id);
      await setDoc(docRef, payload);
      effect.setSelectedChat({ ...payload, type: 'message', id: id });
      if (window.innerWidth < 768) globalView.setView('message');
      else globalView.setView('');
    }
  }
  return (
    <div className={`w-full max-h-[27%] overflow-hidden flex  m-1 p-3 gap-3 items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-darkLight rounded-md ${select === index ? 'bg-gray-200' : ''}`} onClick={handleClick}>
          <figure className='basis-[12%] max-w-[50px] rounded-full overflow-hidden shrink-0 max-h-[50px]'><img src={user.imageUrl} alt="" className='w-full h-full' /></figure>
          <p className='font-bold tracking-wide '>{ user.username}</p>
    </div>
  )
}

export default UserList
