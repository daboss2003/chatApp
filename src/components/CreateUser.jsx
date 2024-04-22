import React, { useReducer } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { PiUploadSimpleBold } from 'react-icons/pi'
import { generateImageName } from '../assets/filter'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import db, { storage, auth } from '../firebase/firebaseConfig'
import { collection, doc, updateDoc } from 'firebase/firestore'



const initial =  { 
    image: null,
    username: '',
    email: '',
    bio: ''
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

function CreateUser() {
    const [updateData, dispatch] = useReducer(reducer, initial);
    const currentUser = auth.currentUser;
    
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
      const fileRef = ref(storage, uniqName);
      const userCollection = collection(db, "users");
      const docRef = doc(userCollection, currentUser.uid);
      try {
        await uploadBytes(fileRef, updateData.image);
        const downloadUrl = await getDownloadURL(fileRef);
          const payload = {
          phone: currentUser.phoneNumber,
          username: updateData.username,
          bio: updateData.bio,
          imageUrl: downloadUrl,
          email: updateData.email
        }
          await updateDoc(docRef, payload);
          toast.success('Account Created');
      }
      catch (err) {
        console.log(err);
      }
    }
    else toast.error('please fill all part of the form to continue');
  }
  return (
    <div className='flex items-center justify-center h-screen w-screen bg-gray-200'>
      <Toaster toastOptions={{duration:4000}} />
      <div className='w-[70%]'>
        <h2 className='text-blueColor text-2xl tracking-wide mb-8 text-center'>Add information to personalize your account</h2>   
        <form onSubmit={handleSubmit} className='my-4 p-4 bg-gray-100 dark:bg-dark rounded-md'>
        <div className='w-full mx-auto p-3 bg-light mb-3 dark:bg-darkLight rounded-md'><label htmlFor="email" className='text-blueColor text-xl p-3'>Email:</label><input type="text" value={updateData?.email} onChange={(e) => dispatch({type: 'email', payload: e.target.value})} className='outline-none border-none w-[80%] mx-auto bg-transparent' /></div>
        <div className='w-full mx-auto p-3 bg-light mb-3 dark:bg-darkLight rounded-md'><label htmlFor="name" className='text-blueColor text-xl p-3'>Username:</label><input type="text" value={updateData?.username} onChange={(e) => dispatch({ type: 'username', payload: e.target.value })} className='outline-none border-none w-[80%] mx-auto bg-transparent' /></div>
          <div className='w-full mx-auto p-3 bg-light mb-3 dark:bg-darkLight rounded-md'><label htmlFor="bio" className='text-blueColor text-xl p-3'>Bio:</label><input type="text" value={updateData?.bio} onChange={(e) => dispatch({ type: 'bio', payload: e.target.value })} className='outline-none border-none w-[80%] mx-auto bg-transparent' /></div>
          <p className='text-blueColor text-center'>Select an Image</p>
          <div className='mt-3 flex items-center justify-center p-2'><input type="file" accept='image/*' onChange={handleImage} id='profile' className='absolute left-[-1000%]' /> <label htmlFor="profile" className='p-5 rounded-full bg-light dark:bg-transparent border border-blueColor hover:bg-blueColor duration-300 ease-in-out hover:text-light cursor-pointer'><PiUploadSimpleBold size={30} /></label></div>
          <div className='w-full mx-auto mt-2 flex items-center justify-center'>
             <button className='bg-transparent dark:bg-transparent  text-md py-1 rounded-md border border-blueColor hover:bg-blueColor duration-300 ease-in-out hover:text-light px-4'>Submit</button>
          </div>
        
        </form> 
      </div>
    </div>
  )
}

export default CreateUser
