import React, { useContext } from 'react'
import NavBtn from './NavBtn'
import { userContext, displayContext } from '../context/context';
import { BiMessageRoundedDetail } from "react-icons/bi";
import {  FiArchive } from "react-icons/fi";
import { MdCamera } from "react-icons/md";
import { HiOutlineStar } from "react-icons/hi";
import { MdNotificationsNone } from "react-icons/md";
 

function Navbar() {
  const display = useContext(displayContext);
  const user = useContext(userContext);
  return (
    <div className=' md:w-[60px] px-2 md:py-5 order-1 md:order-[0] flex md:flex-col items-center justify-between w-full md:h-[90vh]  h-[10vh]'>
      <div className='flex md:flex-col gap-4 items-center'>
        <NavBtn num={1} activeBtn={display.active} handleClick={display.setActive} ><BiMessageRoundedDetail size={22} /></NavBtn>
        <NavBtn num={2} activeBtn={display.active} handleClick={display.setActive} ><MdNotificationsNone size={22} /></NavBtn>
        <NavBtn num={3} activeBtn={display.active} handleClick={display.setActive} ><MdCamera size={22} /></NavBtn>
      </div>
      <div className='flex md:flex-col gap-4 items-center'>
        <NavBtn num={4} activeBtn={display.active} handleClick={display.setActive} ><HiOutlineStar size={22} /></NavBtn>
        <NavBtn num={5} activeBtn={display.active} handleClick={display.setActive} ><FiArchive size={22} /></NavBtn>
        <NavBtn num={6} activeBtn={display.active} handleClick={display.setActive} isUser={true} >
          <img src={user?.imageUrl} alt="user image" className='rounded-full w-[30px] h-[30px]' /> 
        </NavBtn>
      </div>
    </div>
  )
}

export default Navbar
