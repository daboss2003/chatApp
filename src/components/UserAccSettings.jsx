import React, { useContext, useReducer, useState } from 'react'
import NavBtn from './NavBtn'
import { userContext } from '../context/context'
import { CiEdit } from "react-icons/ci";
import db, { auth } from '../firebase/firebaseConfig';
import { collection, updateDoc, doc } from 'firebase/firestore';
import { generateImageName } from '../assets/filter';
import { storage } from '../firebase/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { PiUploadSimpleBold } from 'react-icons/pi';
import toast, { Toaster } from 'react-hot-toast';
import { signOut } from 'firebase/auth';



const initial = (user) => {
  return {
    image: null,
    username: user.username,
    email: user.email,
    bio: user.bio
  }
  
}

function reducer(state, action) {
  switch (action.type) {
    case "image":
      return { ...state, image: action.payload }
    case "username":
      return { ...state, username: action.payload }
    case "email":
      return { ...state, email: action.payload }
    case "bio":
      return { ...state, bio: action.payload }
  }
}
function UserAccSettings() {
  const user = useContext(userContext);
  const [updateData, dispatch] = useReducer(reducer, initial(user));
  const [showForm, setShowForm] = useState(false);
  

  function handleShowForm() {
    setShowForm(prev => !prev);
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/') && file.size < 2 * 1024 * 1024) {
      dispatch({ type: 'image', payload: file });
    }
    else {
      toast.error(`Image too large please select an image less than 2mb or make sure you select an image file`)
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (updateData.image && updateData.username && updateData.email && updateData.bio) {
      const uniqName = generateImageName('image');
      setShowForm(false);
      const fileRef = ref(storage, uniqName);
      const userCollection = collection(db, "users");
      const docRef = doc(userCollection, user.id);
      try {
        await uploadBytes(fileRef, updateData.image);
        const downloadUrl = await getDownloadURL(fileRef);
        const payload = {
          username: updateData.username,
          bio: updateData.bio,
          imageUrl: downloadUrl,
          email: updateData.email
        }
        await updateDoc(docRef, payload);
        
      }
      catch (err) {
        console.log(err);
      }
    }
    else toast.error('please fill all part of the form to continue');
  }

  async function handleLogOut() {
    const userCollection = collection(db, "users");
    const docRef = doc(userCollection, user.id);
    await updateDoc(docRef, {active: false});
    await signOut(auth)
  }
  return (
    <div className='relative  h-full overflow-y-auto overflow-x-hidden max-w-[680px] mx-auto px-3'>
          <Toaster toastOptions={{duration:4000}} />
          <h2 className='font-bold text-xl tracking-wide text-blueColor'>Settings</h2>
          <div className='flex items-center justify-center my-5 relative flex-col'>
            <figure className='w-[150px] h-[150px] rounded-full overflow-hidden border border-blueColor relative after:absolute after:bg-blueColor cursor-pointer after:w-full after:h-full after:top-[100%] hover:after:top-[0] after:duration-1000 after:ease-in-out'><img src={user?.imageUrl} alt="" className='w-full' /></figure>
            <NavBtn handleClick={handleShowForm}><CiEdit size={30}  type='update'/></NavBtn>
          </div>
          <div className='flex items-center justify-between'>
              <p className='font-bold tracking-wide text-lg'>{user?.username}</p>
              <NavBtn handleClick={handleShowForm}><CiEdit size={25}  type='update'/></NavBtn>
          </div>
          <div className='flex items-center justify-between'>
              <p className='tracking-wide'>{user?.bio}</p>
              <NavBtn handleClick={handleShowForm}><CiEdit size={25}  type='update'/></NavBtn>
          </div>
          <div className='flex items-center justify-between border-b'>
              <p className='tracking-wide'>{user?.email}</p>
              <NavBtn handleClick={handleShowForm}><CiEdit size={25}  type='update'/></NavBtn>
          </div>
            <p className='tracking-wide mt-3'>Phone number</p>
          <p className='font-bold tracking-wide text-lg'>{user?.phone}</p>
          <div className='border-t mt-3 flex items-center justify-center p-3'>
            <button className='bg-light dark:bg-transparent  text-lg py-2 rounded-md border border-blueColor hover:bg-blueColor duration-300 ease-in-out hover:text-light px-6' onClick={handleLogOut}>Log out</button>
      </div>
      

      {showForm ?
        <form onSubmit={handleSubmit} className='my-4 p-4 bg-gray-100 dark:bg-dark rounded-md'>
        <div className='w-full mx-auto p-3 bg-light mb-3 dark:bg-darkLight rounded-md'><input type="text" value={updateData?.email} onChange={(e) => dispatch({type: 'email', payload: e.target.value})} className='outline-none border-none w-[80%] mx-auto bg-transparent' /></div>
        <div className='w-full mx-auto p-3 bg-light mb-3 dark:bg-darkLight rounded-md'><input type="text" value={updateData?.username} onChange={(e) => dispatch({ type: 'username', payload: e.target.value })} className='outline-none border-none w-[80%] mx-auto bg-transparent' /></div>
        <div className='w-full mx-auto p-3 bg-light mb-3 dark:bg-darkLight rounded-md'><input type="text" value={updateData?.bio} onChange={(e) => dispatch({ type: 'bio', payload: e.target.value })}  className='outline-none border-none w-[80%] mx-auto bg-transparent'/></div>
          <div className='mt-3 flex items-center justify-center p-2'><input type="file" accept='image/*' onChange={handleImage} id='profile' className='absolute left-[-1000%]' /> <label htmlFor="profile" className='p-5 rounded-full bg-light dark:bg-transparent border border-blueColor hover:bg-blueColor duration-300 ease-in-out hover:text-light cursor-pointer'><PiUploadSimpleBold size={30} /></label></div>
          <div className='w-full mx-auto mt-2 flex items-center justify-center'>
             <button className='bg-transparent dark:bg-transparent  text-md py-1 rounded-md border border-blueColor hover:bg-blueColor duration-300 ease-in-out hover:text-light px-4'>Submit</button>
          </div>
        
        </form>
        : ''
      }
      
    </div>
  )
}

export default UserAccSettings
