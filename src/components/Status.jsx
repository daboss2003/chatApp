import React, { useContext, useState } from 'react'
import { PostContext, userContext } from '../context/context';
import PostList from './PostList';
import { FaPlus } from "react-icons/fa6";
import { PiUploadSimpleBold } from 'react-icons/pi';
import { generateImageName } from '../assets/filter';
import db, { storage } from '../firebase/firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import messageSound from '/messageSent.mp3'
import { LiaTimesSolid } from 'react-icons/lia';

function Status() {
  const Posts = useContext(PostContext); 
  const [select, setSelect] = useState('');
  const user = useContext(userContext);
  const [type, setType] = useState('');
  const [input, setInput] = useState('');
  const [showPost, setShowPost] = useState(false);
  const postCollection = collection(db, "posts");
  const docRef = doc(postCollection, crypto.randomUUID());


  function createPostObj(type, value) {
    return {
      user: `users/${user.id}`,
        category: type,
        timestamp: new Date().toString(),
        likes: {
          number: 0,
          users: []
        },
        content: {
          photoUrl: type === 'photo' ? value : '',
          text: type === 'text' ? value : '',
          videoUrl: type === 'video' ? value : '',
        },
        comments: {
          number: 0,
          body: [],
        }
    }
  }

   function playSound(sound) {
    const audio = new Audio(sound);
    audio.play()
  }

  async function handleFileChange(e) {
    const file = e.target.files[0];
    let fileCategory;
    let uniqName;
    const fileType = file.type
    const fileExtention = file.name.split('.').pop().toLowerCase();
    if (fileType.startsWith('video')) {
      fileCategory = 'video';
      uniqName = generateImageName('video');
    }
    else if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(fileExtention)) {
      fileCategory = 'photo'
      uniqName = generateImageName('image');
    }
    else {
      alert('Wrong file type');
      return 
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('file too large select a maximum of 5mb');
      return
    }
    const fileRef = ref(storage, uniqName);
    try {
      await uploadBytes(fileRef, file);
      const downloadUrl = await getDownloadURL(fileRef);
      const payload = createPostObj(fileCategory, downloadUrl);
      await setDoc(docRef, payload);
      playSound(messageSound);
      setType('');
      setShowPost(false);
    }
      catch (err) {
        console.log(err);
    }
  }


  async function textSubmit() {
    try {
      const payload = createPostObj('text', input);
      await setDoc(docRef, payload);
      playSound(messageSound);
      setType('');
      setShowPost(false);
    }
      catch (err) {
        console.log(err);
    }
  }

  function handleShowPost() {
    setShowPost(prev => !prev)
    setType('');
  }

 
  return (
    <div className='relative  h-full'>
      <h2 className='font-bold text-xl tracking-wide text-blueColor md:px-2 px-8'>Status</h2>
      <div className='flex items-center py-4 px-3 gap-7'>
        <figure className='w-[70px] h-[70px] overflow-hidden rounded-full'><img src={user.imageUrl} alt="" className='w-full max-h-[100%]' /></figure>
        <div className=' flex flex-col gap-2 items-center'>
          <h2 className='tracking-wide font-lg text-blueColor'>Create New</h2>
          <button onClick={handleShowPost} className='p-2 bg-blueColor text-light rounded-lg cursor-pointer'>{showPost ? <LiaTimesSolid size={22} /> : <FaPlus size={22} /> }</button>
        </div>
      </div>
      {showPost ? 
        <div className='p-2 w-[90%] mx-auto bg-gray-100 dark:bg-darkLight rounded-lg mb-5'>
          <input type="text" value={type} className='border-0 outline-none w-full bg-transparent' onChange={(e) => setType(e.target.value)} placeholder='State the type of Post you want to create' />
        </div> : ''
     }
      {type === 'text' &&  
        <div className='my-4 p-4 bg-gray-100 dark:bg-dark rounded-md'>
          <div className='w-full mx-auto p-3 bg-light mb-3 dark:bg-darkLight rounded-md'>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Enter at least 5 words'  className='outline-none border-none w-[80%] mx-auto bg-transparent' />
          </div>
          <div className='w-full mx-auto mt-2 flex items-center justify-center'>
              {input.length > 10 && <button className='bg-transparent dark:bg-transparent  text-md py-1 rounded-md border border-blueColor hover:bg-blueColor duration-300 ease-in-out hover:text-light px-4' onClick={textSubmit}>Submit</button>}
          </div>
        </div>
      }
      {type === 'image' || type === 'video' ?
        <div className='mt-3 flex items-center justify-center p-2 bg-gray-100 dark:bg-dark rounded-md'><input type="file"  onChange={handleFileChange} id='post' className='absolute left-[-1000%]' /> <label htmlFor="post" className='p-5 rounded-full bg-light dark:bg-transparent border border-blueColor hover:bg-blueColor duration-300 ease-in-out hover:text-light cursor-pointer'><PiUploadSimpleBold size={30} /></label></div>: ''
      }
       <h2 className='tracking-wide font-lg text-blueColor md:px-2 px-8'>All Posts</h2>
      {Posts.length > 0 ?
        <div>{Posts.map((item, i) => <PostList key={item.id} index={i} select={select} setSelect={setSelect} postId={item.id} />)}</div>
        : <h2>No Posts in the DataBase</h2>
      }
  </div>
  )
}

export default Status
