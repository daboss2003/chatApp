import React, { useEffect, useState } from 'react'
import { BsFillShieldFill, BsTelephoneFill } from 'react-icons/bs'
import OtpInput from 'otp-input-react'
import { CgSpinner } from 'react-icons/cg'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {auth} from '../firebase/firebaseConfig'
import toast, { Toaster } from 'react-hot-toast';



function Auth() {
  const [otp, setOtp] = useState('');
  const [phoneNo, setPhone] = useState('');
  const [loading, setIsloading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);



  useEffect(() => {
    window.recaptchaVerifier  = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'normal',
      'callback': (response) => {
      
      },
      'expired-callback': () => {
       
      }
    })
  },[])
     


  function VerifyUsers() {
    setIsloading(true)
    const recaptcha = window.recaptchaVerifier
    const formatPh = '+' + phoneNo.replace(/\D/g, '')
    signInWithPhoneNumber(auth, formatPh, recaptcha)
    .then((confirmationResult) => { 
      window.confirmationResult = confirmationResult;
      setIsloading(false);
      setShowOtp(true);
      toast.success('OTP sent successfully!');
    }).catch((error) => {
      setIsloading(false);
      console.log(error)
      toast.error(`${error}`)
    });
  }

  function oTPVerify() {
    setIsloading(true)
    window.confirmationResult.confirm(otp).then(async (res) => {
      console.log(res)
      setIsloading(false)
    }).catch(err => {
      console.log(err)
       toast.error(`${err}`)
    })
  }
  return (
    <div className='bg-light flex items-center justify-center h-screen max-w-[100vw]'>
      <div>
        <Toaster toastOptions={{duration:4000}} />
        <div className='w-90 flex flex-col gap-4 rounded-lg p-4'>
          <h1 className='text-center leading-normal font-medium  text-3xl mb-3 text-dark'>WelCome to Whatsapp</h1>
          {showOtp ? 
            <>
            <div className='bg-blueColor text-light w-fit mx-auto p-4 rounded-full'>
              <BsFillShieldFill size={30} />
            </div>
              <label htmlFor="otp" className='font-bold text-2xl text-dark text-center'>Enter your OTP</label>
              <div className='bg-blueColor p-4 rounded-md'>
                <OtpInput OTPLength={6} otpType="number" autoFocus value={otp} onChange={setOtp}></OtpInput>
              </div>
            <button className='bg-blueColor flex gap-1 items-center justify-center py-2.5 text-light rounded w-full' onClick={oTPVerify}>
              {loading && <CgSpinner size={20} className='mt-1 animate-spin'/>}
              
              <span>Verify OTP</span>
            </button>
            </> :
             <>
            <div className='bg-blueColor text-light w-fit mx-auto p-4 rounded-full'>
              <BsTelephoneFill size={30} />
            </div>
            <label htmlFor="ph" className='font-bold text-2xl text-dark text-center'>Verify your phone number</label>
            <PhoneInput country={'ng'} value={phoneNo} onChange={setPhone} inputStyle={{height: '50px', width: '400px', maxWidth: '95vw'}} a />
            <button className='bg-blueColor flex gap-1 items-center justify-center py-2.5 text-light rounded w-full' onClick={VerifyUsers}>
              {loading && <CgSpinner size={20} className='mt-1 animate-spin'/>}
              
              <span>Send code via SMS</span>
            </button>
          </>
          }
           <div id='recaptcha-container'></div>
        </div>
      </div>
    </div>
  )
}

export default Auth
