import React, {useContext, useEffect, useState} from 'react'
import logo from '/img/chat.png'
import NavBtn from './NavBtn'
import { userContext, displayContext } from '../context/context';
import { FaSun } from "react-icons/fa";
import { BsMoonStarsFill } from "react-icons/bs";


function Header() {
  const user = useContext(userContext);
  const display = useContext(displayContext);
  const [darkMode, setDarkMode] = useState(() => {
    let mode = localStorage.getItem('dark');
    if (mode !== null) return mode;
    else return false;
  });


  useEffect(() => {
    if (darkMode) {
      document.querySelector('html').classList.add('dark');
      localStorage.setItem('dark', darkMode);
    }
      
    else { 
      document.querySelector('html').classList.remove('dark');
      localStorage.removeItem('dark');
    }
    
  }, [darkMode]);
  

  return (
    <div className='py-[6px] px-3 max-h-[8vh] h-[8vh] flex items-center justify-between'>
      <div className='flex gap-2 sm:w-[30%] justify-center items-center'>
        <figure className='w-[35px]'>
          <img src={logo} alt="Logo" className='w-full' />
        </figure>
        <div>
          <span className='font-bold text-dark dark:text-light tracking-wide text-xl font-playfair'>chat</span>
          <span className='font-bold text-blueColor tracking-wide text-xl font-playfair'>App</span>
        </div>
      </div>
      <div className='flex gap-4 sm:w-[30%] justify-center items-center'>
        <button className='text-blueColor cursor-pointer rounded-full ' onClick={() => setDarkMode(prev => !prev)}>
          {darkMode ? <BsMoonStarsFill size={23} /> : <FaSun size={23} />}
        </button>
        <div className='xs:hidden'>
          <NavBtn num={6} activeBtn={display.active} handleClick={display.setActive} >
            <img src={user?.imageUrl} alt="user image" className='rounded-full w-[30px] h-[30px]' />
          </NavBtn>
        </div>
      </div>
    </div>
  )
}

export default Header
