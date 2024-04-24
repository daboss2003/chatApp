import React, {useContext, useEffect, useState} from 'react'
import logo from '/img/chat.png'
import { ViewContext } from '../context/context';
import { FaSun } from "react-icons/fa";
import { BsMoonStarsFill } from "react-icons/bs";
import Button from './Button';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import { IoMdSearch } from 'react-icons/io';
import { CiMenuKebab } from 'react-icons/ci';


function Header() {
  const globalView = useContext(ViewContext);
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
    <div className={`py-[6px] px-3 max-h-[8vh] h-[8vh] items-center justify-between ${globalView.showNav ? 'flex' : 'hidden'}`}>
      {window.innerWidth >= 768 && 
        <div className='flex gap-2 sm:w-[30%] justify-center items-center'>
        <figure className='w-[35px]'>
          <img src={logo} alt="Logo" className='w-full' />
        </figure>
        <div>
          <span className='font-bold text-dark dark:text-light tracking-wide text-lg'>Whatsapp</span>
        </div>
      </div>
      }
      {window.innerWidth < 768 && 
        <div className='flex items-center justify-between w-full'>
          <h2 className='tracking-wide text-xl basis-[45%]'><span className='font-medium text-2xl'>WA</span> Business</h2>
          <div className='basis-[50%] flex items-center justify-end gap-2'>
            <Button><MdOutlinePhotoCamera size={25} /></Button>
            <Button><IoMdSearch size={25} /></Button>
            <div className='dropdown'>
              <Button><CiMenuKebab size={25} /></Button>
              <div>
                <li>Advertise</li>
                <li>Business tools</li>
                <li>New group</li>
                <li>New brodcase</li>
                <li>Communities</li>
                <li>Labels</li>
                <li>Linked device</li>
                <li>Starred messages</li>
                <li>Settings</li>
              </div>
            </div>
          </div>
        </div>
      }
      <div className='flex gap-4 sm:w-[30%] justify-center items-center'>
        {window.innerWidth >= 768 && 
          <button className='text-blueColor cursor-pointer rounded-full ' onClick={() => setDarkMode(prev => !prev)}>
          {darkMode ? <BsMoonStarsFill size={23} /> : <FaSun size={23} />}
        </button>
        }
        
        {/* <div className='xs:hidden'>
          <NavBtn num={6} activeBtn={display.active} handleClick={display.setActive} >
            <img src={user?.imageUrl} alt="user image" className='rounded-full w-[30px] h-[30px]' />
          </NavBtn>
        </div> */}
      </div>
    </div>
  )
}

export default Header
