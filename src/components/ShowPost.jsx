import React, { useContext, useEffect, useState } from 'react'
import { FaChevronLeft, FaRegCommentDots, FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa'
import Button from './Button'
import { AllUsersContext, RefContext, userContext, EffectContext } from '../context/context';
import { collection, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import db from '../firebase/firebaseConfig';
import messageSound from '/messageSent.mp3'
import { GrEmoji } from 'react-icons/gr';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data'
import { IoMdSend } from 'react-icons/io';
import moment from 'moment';
import CommentList from './CommentList';

function ShowPost({ selected, handleSize }) {
  const Allusers = useContext(AllUsersContext);
  const user = useContext(userContext);
  const post = selected;
  const [error, setError] = useState('');
  const colorArray = [
      `#C0C0C0`,
      `#808080`,
      `#FF0000`,
      `#800000`,
      `#FFFF00`,
      `#808000`,
      `#00FF00`,
      `#008000`,
      `#00FFFF`,
      `#008080`,
      `#0000FF`,
      `#FF00FF`];
  const random = Math.floor(Math.random() * 10);
  const creator = Allusers.find(item => item.id === post.user.split('/')[1]);
  const PostCollection = collection(db, "posts");
  const docRef = doc(PostCollection, post.id);
  const NoteCollection = collection(db, 'notifications')
  const noteRef = doc(NoteCollection, crypto.randomUUID());
  const userLikes = post.likes.users.includes(user.id);
  const [input, setInput] = useState('');
  const inputRef = useContext(RefContext);
  const [showEmoji, setShowEmoji] = useState(false);
  const effect = useContext(EffectContext);

  useEffect(() => {
    const unsubscribe =  onSnapshot(docRef, (doc) => {
      effect.setSelectedChat({ ...doc.data(), id: doc.id, type: 'post' });
      setError('')
    },
      error => setError(`Error: ${error}`))
    return () => unsubscribe();
  },[]);

  function playSound(sound) {
    const audio = new Audio(sound)
    audio.play()
  }

  async function handleLike() { 
    let likesArray;
    if (userLikes) {
      likesArray = post.likes.users.filter(item => item !== user.id);
    }
    else {
      likesArray = [...post.likes.users, user.id];
    }
    const newObj = {users: likesArray, number: likesArray.length}
    const payload = {likes: newObj}
    await updateDoc(docRef, payload);
    playSound(messageSound);
  }
  async function handleComments() {
    const comments = [...post.comments.body, { user: user.id, text: input, timestamp: new Date().toString() }];
    const newObj = { body: comments, number: comments.length };
    const payload = {comments: newObj}
    const note = {
      post: post.id,
      text: `${creator.id === user.id ? 'You' : user.username} commented to your post`,
      timestamp: new Date().toString(),
      user: creator.id
    }
    await updateDoc(docRef, payload);
    await setDoc(noteRef, note);
    playSound(messageSound);
    setInput('');
  }

  function handleEmojiSelect(emoji) {
    setInput(prev => `${prev}${emoji.native}`);
  }
  function handleShowEmoji() {
    setShowEmoji(prev => !prev);
  }

  
  if (error) {
    return <h2 className='w-full h-full flex items-center justify-center text-xl font-medium'>{error }</h2>
  }

  return (
    <div className='md:max-h-[92vh] md:h-[92vh] lg:basis-[60%] md:basis-[50%] w-full h-[82vh] '>
      <header className='bg-light dark:bg-dark h-[10%] max-h-[10%] w-full flex items-center justify-between px-3'>
          <div className='flex items-center gap-3'>
            <Button onClick={handleSize} type={'back'}><FaChevronLeft size={16} /></Button>
            <figure className='w-11 rounded-full overflow-hidden'><img src={creator.imageUrl} alt="" className='w-full max-h-[100%]' /></figure>
            <p className='tracking-wide font-bold '>{creator.username}</p>
            <p className='ml-6 text-blueColor text-sm'>{ moment(post.timestamp).fromNow() }</p>
          </div>
      </header>
      <div className='max-h-[80%] h-[80%] overflow-hidden px-6 py-4'>
        <div className='bg-light dark:bg-darkLight h-[75%] max-w-[700px] mx-auto p-4 rounded-lg'>
          {post.category === 'text' && <div style={{ backgroundColor: colorArray[random] }} className='h-[90%] rounded-lg flex items-center justify-center'><h2 className='text-2xl text-light font-medium'>{post.content.text}</h2></div>}
          {post.category === 'video' && <div className='h-[90%] rounded-lg'><video src={post.content.videoUrl} controls></video></div>}
          {post.category === 'photo' && <div className={`bg-[url(${post.content.photoUrl})] w-full h-[90%]`}></div>}
          <div className='flex items-center justify-around mt-2'>
            <button onClick={handleLike} className='flex items-center gap-2 text-blueColor'> <p>{post.likes.number}</p> {userLikes ? <FaThumbsUp size={25} /> : <FaRegThumbsUp size={25} />}</button>
            <button className='flex items-center gap-2 text-blueColor'><p>{post.comments.number}</p> <FaRegCommentDots size={25} /></button>
          </div>
        </div>
        <div className='p-4 h-[23%] overflow-y-auto overflow-x-hidden bg-light mt-3 max-w-[700px] mx-auto dark:bg-darkLight'>
          {post.comments.body.length > 0
            ?
            post.comments.body.map((item,i) => <CommentList key={i} comment={item} />)
            : <div className='flex items-center justify-center text-xl tracking-wide w-full h-full'>No Comments on this Post Yet, be the first to comment!</div>
          }
        </div>
      </div>
      <form className='h-[10%] flex items-center bg-light dark:bg-dark px-4 gap-3' onSubmit={(e) => e.preventDefault()}>
          <div className='flex items-center gap-3 overflow-y-auto'>
            <Button onClick={handleShowEmoji}><GrEmoji size={18} /></Button>
            {showEmoji ? <div className='absolute bottom-16'><Picker data={data} onEmojiSelect={handleEmojiSelect} /></div> : ''}
          </div>
          <div className='flex-1 bg-light dark:bg-dark flex items-center gap-2'>
            <input
            placeholder='Type your comment'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            ref={inputRef}
            className='bg-transparent w-full outline-none border-none active:outline-none h-[60%] appearance-none'
            type='text'
              />
            <button className={`py-1 px-3 hover:bg-blueColor hover:text-light rounded-lg duration-300 border border-blueColor dark:text-light items-center justify-center ${input.length >= 3 ? 'flex' : 'hidden'}`} onClick={handleComments}><IoMdSend size={18} /></button>
          </div>
      </form>
    </div>
  )
}

export default ShowPost
