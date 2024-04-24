import React, { useContext, useRef, useState, useEffect } from 'react'
import { FaChevronLeft, FaPlay, FaRegStopCircle } from "react-icons/fa";
import { SlCamrecorder } from "react-icons/sl";
import { LuPhone } from "react-icons/lu";
import { FaCamera } from "react-icons/fa";
import { FiMic } from "react-icons/fi";
import { GrEmoji } from "react-icons/gr";
import { MdAddIcCall, MdOutlineAttachFile } from "react-icons/md";
import Button from './Button';
import { AllUsersContext, userContext, RefContext, EffectContext, ViewContext } from '../context/context';
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { MdArchive } from "react-icons/md";
import { MdOutlineArchive } from "react-icons/md";
import SingleMesssage from './SingleMesssage';
import {  IoMdSend } from "react-icons/io";
import db from '../firebase/firebaseConfig';
import { collection, updateDoc, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { generateImageName, displayTime } from '../assets/filter';
import { storage } from '../firebase/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { MdCameraswitch } from "react-icons/md";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import Webcam from "react-webcam";
import { RxCross2 } from "react-icons/rx";
import { PiCircleDashedFill } from 'react-icons/pi';
import { IoVideocam } from 'react-icons/io5';
import { useRecorder } from 'react-microphone-recorder';
import cameraSound from '/cameraClick.mp3'
import messageSound from '/messageSent.mp3'
import recordSound from '/recordSound.mp3'
import { HiPause } from 'react-icons/hi';
import { CiMenuKebab } from 'react-icons/ci';




function SendMessage({  selected, handleSize }) {
  const user = useContext(userContext);
  const [showEmoji, setShowEmoji] = useState(false);
  const currentMessage = selected;
  const effect = useContext(EffectContext);
  // const [update, setUpdate] = useState({ star: currentMessage.starred, archived: currentMessage.archived });
  const [input, setInput] = useState('');
  const [cameraPosition, setCameraPosition] = useState('user');
  const [isRecording, SetIsRecording] = useState(false);
  const [dataChunck, setDataChunck] = useState([]);
  const [mediaType, setMediaType] = useState('');
  const [audioRecorder, setAudioREcorder] = useState(null);
  const AllUsers = useContext(AllUsersContext);
  const messageCollection = collection(db, "messages");
  const docRef = doc(messageCollection, currentMessage.id);
  const webcamRef = useRef(null);
  const mediaRecoderRef = useRef(null);
  const [error, setError] = useState('');
  const inputRef = useContext(RefContext);
  const { audioLevel, startRecording, pauseRecording, stopRecording, resetRecording, audioBlob, isRecording: audioRecording, resumeRecording } = useRecorder();
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const globalView = useContext(ViewContext);
  
 

  useEffect(() => {
    const unsubscribe =  onSnapshot(docRef, (doc) => {
      effect.setSelectedChat({ ...doc.data(), id: doc.id, type: 'message' });
      setError('')
    },
      error => setError(`Error: ${error}`))
    return () => unsubscribe();
  },[]);


  function pauseTimer() {
    clearInterval(timerInterval);
    // setStartTime(elapsedTime)
  }

  function resetTimer() {
    clearInterval(timerInterval)
    setStartTime(null)
    setElapsedTime(0)
  }

  function resumeTimer() {
    setTimerInterval(setInterval(() => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      setElapsedTime(elapsed);
    }, 1000));
  }

  function startTimer() {
    const initial = Date.now()
    setStartTime(initial);
    setTimerInterval(setInterval(() => {
      const currentTime = Date.now();
      const elasped = currentTime - initial;
      setElapsedTime(elasped)
    }, 1000));
  }

   const time =  displayTime(elapsedTime);


 

  async function fetchPrevMessage() {
    // const docSnapShot = await getDoc(docRef);
    // if (docSnapShot.exists()) {
    //    return docSnapShot.data().chat
    // }
    // else {
    //   return {}
    // }
    return currentMessage.chat
  }

  function playSound(sound) {
    const audio = new Audio(sound);
    audio.play()
  }
  function videoRecordStart() {
    const stream = webcamRef.current.stream;
    mediaRecoderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm' });
    mediaRecoderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setDataChunck((prev) => prev.concat(event.data));
      }
    }
    mediaRecoderRef.current.start();
    SetIsRecording(true);
    playSound(recordSound)
    startTimer()
  }

  async function videoRecordEnd() {
    mediaRecoderRef.current.stop();
    SetIsRecording(false);
    playSound(messageSound)
    const blob = new Blob(dataChunck, { type: 'video/webm' });
    const uniqName = generateImageName('video');
    const fileRef = ref(storage, uniqName);
    try {
      setMediaType('')
      await uploadBytes(fileRef, blob);
      const downloadUrl = await getDownloadURL(fileRef);
      const prevMessage = await fetchPrevMessage()
      const newChat = [...prevMessage, newMessageObj('video', downloadUrl)]
      const payload = {chat: newChat}
      await updateDoc(docRef, payload);
      resetTimer()
      
      
    }
      catch (err) {
        console.log(err);
      }
  }

  async function capture() {
    const imageSrc = webcamRef.current.getScreenshot();
    playSound(cameraSound)
    if (imageSrc) {
      const blob = await fetch(imageSrc).then((res) => res.blob());
      const uniqName = generateImageName('image');
      const fileRef = ref(storage, uniqName);
      try {
        setMediaType('')
        await uploadBytes(fileRef, blob);
        const downloadUrl = await getDownloadURL(fileRef);
        const prevMessage = await fetchPrevMessage()
        const newChat = [...prevMessage, newMessageObj('photo', downloadUrl)]
        const payload = {chat: newChat}
        await updateDoc(docRef, payload);
        
      }
      catch (err) {
        console.log(err);
      }
    }
  }
  
     
    
  



  let sender;
  if (currentMessage.user1.split('/')[1] === user.id) {
    sender = AllUsers.find(item => item.id === currentMessage.user2.split('/')[1]);
  }
  else {
    sender = AllUsers.find(item => item.id === currentMessage.user1.split('/')[1]);
  }

  const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: cameraPosition
  };




  function newMessageObj(type, data) {
    return {
      senderId: user.id,
      recieverId: sender.id,
      timestamp: new Date().toString(),
      chatId: crypto.randomUUID(),
      body: {
        type: type,
        content: {
          text: type === 'text' ? data : '',
          photoUrl: type === 'photo' ? data : '',
          audioUrl: type === 'audio' ? data : '',
          videoUrl: type === 'video' ? data : ''
        },
      },
      seen: false,
    }
     
  }

  function handleEmojiSelect(emoji) {
    setInput(prev => `${prev}${emoji.native}`);
  }


  async function handleStarred() {
    const payload = { starred: !currentMessage.starred };
    try {
      playSound(messageSound)
      await updateDoc(docRef, payload); 
      //  setUpdate(prev => ({ ...prev, star: !prev.star }));
       
    }
      catch (err) {
        console.log(err);
      }
    
  }

  async function handleArchived() {
    const payload = { archived: !currentMessage.archived };
    try {
       playSound(messageSound)
       await updateDoc(docRef, payload); 
      //  setUpdate(prev => ({ ...prev, archived: !prev.archived }));
    }
      catch (err) {
        console.log(err);
      }
  }

  function handleInput(e) {
    setInput( e.target.value );
  }
 
  async function handleTextMessage() {
    
    const prevMessage = await fetchPrevMessage()
    const newChat = [...prevMessage, newMessageObj('text', input)]
    
    const payload = { chat: newChat };
     try {
       await updateDoc(docRef, payload); 
       playSound(messageSound)
       setInput('');
    }
      catch (err) {
        console.log(err);
      }
      
    
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
    else if (fileType.startsWith('audio')) {
      fileCategory = 'audio'
      uniqName = generateImageName('audio');
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
      const prevMessage = await fetchPrevMessage() 
      const newChat = [...prevMessage, newMessageObj(fileCategory, downloadUrl)]
      const payload = { chat: newChat }
      await updateDoc(docRef, payload);
      playSound(messageSound)
    }
      catch (err) {
        console.log(err);
    }


  }

  function handleShowEmoji() {
    setShowEmoji(prev => !prev);
  }

  function handleCamera() {
    setCameraPosition(prev => prev === 'user' ? 'environment' : 'user')
  }

  function handleCloseRecorder() {
    setAudioREcorder(null)
    resetRecording()
    resetTimer()
  }

  function handleStartRecording() {
    setAudioREcorder(true)
    startRecording()
    startTimer()
  }

  function handleRecordingMotion() {
    if (audioRecording) {
      pauseRecording();  
      pauseTimer();
    }
    else {
      resumeRecording();
      resumeTimer();
    }
  }

  function handleCloseMediaType(){
    resetTimer()
    setMediaType('');
    SetIsRecording(false);
    if(mediaRecoderRef.current) mediaRecoderRef.current.stop();
  }

  async function handleUploadAudio() {
    stopRecording()
    const uniqName = generateImageName('audio');
    const fileRef = ref(storage, uniqName);
    try {
      await uploadBytes(fileRef, audioBlob);
      const downloadUrl = await getDownloadURL(fileRef);
      const prevMessage = await fetchPrevMessage()
      const newChat = [...prevMessage, newMessageObj('audio', downloadUrl)]
      const payload = {chat: newChat}
      await updateDoc(docRef, payload);
      playSound(messageSound)
      handleCloseRecorder()
    }
    catch (err) {
      console.log(err);
    }
    
  }

  if (error) {
    return <h2 className='w-full h-full flex items-center justify-center text-xl font-medium'>{error }</h2>
  }
    return (
      <div className={` w-full relative ${!globalView.showNav ? 'h-[100vh]' : 'h-full'}`}>
         <header className='bg-light dark:bg-dark h-[10%] max-h-[10%] w-full flex items-center justify-between px-3'>
            <div className='flex items-center gap-3'>
                  <Button onClick={handleSize} type={'back'}><FaChevronLeft size={16} /></Button>
            <figure className='w-[45px] rounded-full '><img src={sender.imageUrl} alt="" className='w-[30px] h-[30px] rounded-full' /></figure>
                <div>
                 <p className='tracking-wide font-bold '>{sender.username}</p>
                  <p className='text-blueColor text-sm tracking-wide'>{sender?.active ? 'online' : 'offline'}</p>
                   
                </div>
                   
          </div>
          <div className='lg:static absolute top-20 bg-inherit right-0'>
            <Button type={'call'} onClick={handleStarred}>
              {
                currentMessage.starred ? <AiFillStar size={18} /> : <AiOutlineStar size={18} />
              }
            </Button>
            <Button type={'call'} onClick={handleArchived}>
              {
                currentMessage.archived ? <MdArchive size={18} /> : <MdOutlineArchive size={18} />
              }
            </Button>
          </div>
          {window.innerWidth >= 768 &&
            <div className='pr-6 flex items-center justify-center'>
                  <Button type={'call'}><SlCamrecorder size={18} /></Button>
                  <Button type={'call'}><LuPhone size={18} /></Button>
            </div>
          }
          {window.innerWidth < 768 && 
            <div className='basis-[50%] flex items-center justify-end gap-2'>
            <Button><SlCamrecorder  size={25} /></Button>
              <Button><MdAddIcCall size={25} /></Button>
              <div className='dropdown'>
                <Button><CiMenuKebab size={25} /></Button>
                <div>
                  <li>Label chat</li>
                  <li>View contact</li>
                  <li>Media, links, and docs</li>
                  <li>Search</li>
                  <li>Mute notifications</li>
                  <li>Disappearing messages</li>
                  <li>Wallpaper</li>
                  <li>More</li>
                </div>
              </div>
            
          </div>
          }
        </header>
        <div className='max-h-[80%] h-[80%] overflow-x-hidden overflow-y-auto px-6 py-4 bg-[url(img/bg.jpg)] bg-no-repeat bg-cover bg-center dark:bg-[url(img/bg-dark.webp)]'>
          {
            currentMessage.chat.map(item => <SingleMesssage key={item.chatId} chat={ item } />)
          }
        </div>
          <form className='h-[10%] flex items-center bg-light dark:bg-dark px-4 gap-3 md:rounded-none rounded-3xl md:w-full w-[86%] shadow-md' onSubmit={(e) => e.preventDefault()}>
              <div className='flex items-center gap-3 overflow-y-auto'>
               <Button onClick={handleShowEmoji}><GrEmoji size={18} /></Button>
                {showEmoji ? <div className='absolute bottom-16'><Picker data={data} onEmojiSelect={handleEmojiSelect} /></div> : ''}
               <label htmlFor='fileSelect' className={`dark:text-blueColor bg-inherit hover:bg-gray-200 dark:hover:bg-darkLight p-2 cursor-pointer }`}>
                <MdOutlineAttachFile size={18} /> 
               </label>
               <input type="file" onChange={handleFileChange} className='absolute right-[1000%]' id='fileSelect' />
              </div>
              <div className='flex-1 bg-light dark:bg-dark flex items-center gap-2 '>
                <textarea
                placeholder='Type message'
                value={input}
                onChange={handleInput}
                ref={inputRef}
                 rows='1'
                 className='bg-transparent w-full outline-none border-none active:outline-none h-[60%] appearance-none'
                 ></textarea>
            <button className={`py-1 px-3 hover:bg-blueColor hover:text-light rounded-lg duration-300 border border-blueColor dark:text-light items-center justify-center ${input === '' ? 'hidden' : 'flex'}`} onClick={handleTextMessage}><IoMdSend size={18} /></button>
            <Button onClick={() => setMediaType('image')}><FaCamera size={18} /></Button>
            <Button onClick={() => setMediaType('video')}><SlCamrecorder size={18} /></Button>
          </div>
          {window.innerWidth < 768 &&  <div className='absolute right-0 max-w-[15%] flex justify-center items-center w-[14%]'><button className=' rounded-full bg-blueColor text-light p-4 shadow-md' onClick={handleStartRecording}><FiMic size={18} /></button></div>}
          
               <div className='flex items-center gap-3 lg:flex-row flex-col bg-inherit relative'>
                {mediaType ?
                   <div className='absolute md:-top-[300px] bottom-[50%] w-[70vw] md:h-[55vh] md:-left-[350px] -translate-x-[50%] -translate-y-[50%] bg-light rounded-md p-2 pt-0 dark:bg-darkLight md:min-w-[80%] md:bottom-0 md:max-h-[55vh] md:w-[40vw] webcam shadow-md'>
                    <Button onClick={handleCloseMediaType}><RxCross2 size={18} /></Button>
                    <Webcam
                    audio={isRecording ? true : false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                  />
                  <div className='p-1 flex items-center justify-center gap-4 pb-2'>
                    <button onClick={handleCamera} className='p-2 rounded-full bg-darkLight text-light hover:bg-blueColor'><MdCameraswitch size={22} /></button>
                    {mediaType === 'image' && <button onClick={capture} className='p-2 rounded-full bg-darkLight text-light hover:text-red-500 hover:bg-blueColor'><PiCircleDashedFill size={22}/></button>}
                  {mediaType === 'video' ? !isRecording ? <button onClick={videoRecordStart} className='p-2 rounded-full bg-darkLight text-light hover:text-red-500 hover:bg-blueColor'><IoVideocam size={22} /></button> : <>
                    <button onClick={videoRecordEnd} className='p-2 rounded-full bg-darkLight text-light'><FaRegStopCircle size={22} /></button>  <p>{ time }</p></> : ''}
                    
                  </div>
                </div>: ''
                }
                {audioRecorder ?
                  <div className='absolute top-[65%] md:-top-[100px] md:-left-[200px] p-2 md:-translate-x-[50%] -translate-y-[65%] rounded-lg flex items-center justify-between bg-light dark:bg-darkLight max-w-[98vw] -translate-x-[35%] shadow-md'>
                    <Button onClick={handleCloseRecorder}><RxCross2 size={18} /></Button>
                <div className='bg-light md:p-2 p-1 rounded-lg flex m-2 items-center justify-between md:gap-4 gap-2 dark:bg-dark'><Button onClick={handleRecordingMotion}>{audioRecording ? <HiPause size={22} /> : <FaPlay size={18} /> }</Button> <progress value={audioLevel} className='h-2 rounded-lg' max={10000}></progress> <p className=''>{ time}</p></div>
                    <button className={`py-1 px-3 hover:bg-blueColor hover:text-light rounded-lg duration-300 border border-blueColor dark:text-light items-center justify-center`} onClick={handleUploadAudio}><IoMdSend size={18} /></button>
                  </div> : ''
                }
                
                {window.innerWidth >= 768 && <Button onClick={handleStartRecording}><FiMic size={18} /></Button>}
                
              </div>
          </form>
      </div>
  )
}

export default SendMessage
