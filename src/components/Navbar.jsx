import React, { useContext, useEffect, useState } from 'react'
import NavBtn from './NavBtn'
import { userContext, displayContext, ViewContext, SwiperContext } from '../context/context';
import { BiMessageRoundedDetail, BiSolidMessageDetail } from "react-icons/bi";
import {  FiArchive } from "react-icons/fi";
import { MdCamera, MdOutlinePhone } from "react-icons/md";
import { HiOutlineStar } from "react-icons/hi";
import { MdNotificationsNone } from "react-icons/md";
import { CiShop } from 'react-icons/ci';
 

function Navbar() {
  const display = useContext(displayContext);
  const user = useContext(userContext);
  const globalView = useContext(ViewContext);
  const swiperRef = useContext(SwiperContext);
  const [active, setActive] = useState(0);


  function handelSlide(num) {
    swiperRef.current.swiper.slideTo(num)
    setActive(num)
  }
 

  useEffect(() => {
    function setActiveIndex() {
      setActive(swiperRef.current.swiper.activeIndex)
    }

    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.on('slideChange', setActiveIndex);
    }
    return () => {
      swiperRef.current?.swiper?.off('slideChange', setActiveIndex)
    }
  }, [swiperRef.current]);


  return (
    <div className={`md:w-[60px] px-2 md:py-5 order-1 md:order-[0] flex md:flex-col items-center justify-between w-full md:h-[90vh]  h-[12vh] ${globalView.showNav ? 'flex' : 'hidden'} ${window.innerWidth < 768 && 'bg-gray-300'}`}>
      {window.innerWidth >= 768 && 
        <>
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
        
        </>
      }
      {window.innerWidth < 768 &&
        <div className='flex justify-around items-center p-2 w-full'>
          <div className={`flex flex-col items-center gap-1 cursor-pointer ${active === 0 && 'text-light font-bold'}`} onClick={()=> handelSlide(0)}>
            <button className={`${active === 0 && 'bg-gray-200 shadow-md px-5 p-[2px] rounded-md'}`}><BiSolidMessageDetail size={25} /></button>
            <p>Chats</p>
          </div>
          <div className={`flex flex-col items-center gap-1 cursor-pointer ${active === 1 && 'text-light font-bold'}`}  onClick={()=> handelSlide(1)}>
            <button className={`${active === 1 && 'bg-gray-200 shadow-md px-5 p-[2px] rounded-md'}`}><MdOutlinePhone size={25} /></button>
            <p>Calls</p>
          </div>
          <div className={`flex flex-col items-center gap-1 cursor-pointer ${active === 2 && 'text-light font-bold'}`}  onClick={()=> handelSlide(2)}>
            <button className={`${active === 2 && 'bg-gray-200 shadow-md px-5 p-[2px] rounded-md'}`}><MdCamera size={25} /></button>
            <p>Updates</p>
          </div> 
          <div className={`flex flex-col items-center gap-1 cursor-pointer ${active === 3 && 'text-light font-bold'}`}  onClick={()=> handelSlide(3)}>
            <button className={`${active === 3 && 'bg-gray-200 shadow-md px-5 p-[2px] rounded-md'}`}><CiShop size={25} /></button>
            <p>Tools</p>
          </div>
        </div>
      }
      
    </div>
  )
}

export default Navbar
