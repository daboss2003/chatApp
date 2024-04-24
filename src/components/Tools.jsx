import React from 'react'
import { AiOutlineShop } from 'react-icons/ai'
import { CgMenuGridR } from 'react-icons/cg'
import { IoMdMegaphone } from 'react-icons/io'
import { RiCameraLensFill, RiErrorWarningLine } from 'react-icons/ri'
import MarketList from './MarketList'
import { IoLink } from 'react-icons/io5'
import { TbMessageChatbot } from 'react-icons/tb'
import { FaUmbrellaBeach } from 'react-icons/fa'
import { BsFillLightningChargeFill } from 'react-icons/bs'
import { MdLabel } from 'react-icons/md'
import { FaRegCircleQuestion } from 'react-icons/fa6'

function Tools() {
  return (
    <div className='px-2 w-screen overflow-x-hidden overflow-y-auto max-h-[80vh] pb-8'>
          <h2 className='flex items-center gap-4 pb-3 px-2'>Last 7 days performance <RiErrorWarningLine size={20} /></h2>
          <div className='flex items-center justify-between px-2 pt-1 pb-3'>
              <div className='p-3 shadow-md rounded-md border flex items-start flex-col gap-1'>
                  <button><CgMenuGridR size={30} /></button>
                  <p className='text-lg font-medium'>22</p>
                  <p className='text-sm'>Catalog views</p>
              </div>
              <div className='p-3 shadow-md rounded-md border flex items-start flex-col gap-1'>
                  <button><AiOutlineShop size={30} /></button>
                  <p className='text-lg font-medium'>52</p>
                  <p className='text-sm'>Profile views</p>
              </div>
              <div className='p-3 shadow-md rounded-md border flex items-start flex-col gap-1'>
                  <button><RiCameraLensFill size={30} /></button>
                  <p className='text-lg font-medium'>222</p>
                  <p className='text-sm'>Status views</p>
              </div>
          </div>

          <h2 className='font-bold text-xl p-2'>Grow your Business</h2>
          <div className='w-[95%] mx-auto rounded-xl p-4 bg-gray-200 flex gap-2 items-center flex-col mb-3'>
              <div className='flex items-start gap-3'>
                  <button className='bg-gray-300 p-4 rounded-md text-blueColor'><IoMdMegaphone size={30} /></button>
                  <div className='flex flex-col gap-2 mb-3'>
                      <h2 className='font-bold text-lg tracking-wide'>Ads that lead to WhatsApp</h2>
                      <p className='text-sm'>Reach potential new customers with an ad that lets people start WhatsApp chats with you</p>
                  </div>
              </div>
              <button className='w-full p-2 rounded-xl bg-blueColor text-light font-bold'>Get started</button>
          </div>
          <h2 className='font-bold text-xl p-2'>Business tools</h2>
          <MarketList icon={<AiOutlineShop size={30} />} type={'Business Profile'} desc={'Manage address, hours, and websites'} />
          <MarketList icon={<CgMenuGridR size={30} />} type={'Catalog'} desc={'Show product ans services'} />
          <MarketList icon={<IoMdMegaphone size={30} />} type={'Advertise'} desc={'Create ads that lead to WhatsApp'} />
          <MarketList icon={<IoLink size={30} />} type={'Facebook & Instagram'} desc={'Add WhatsApp to your accounts'} />
          <MarketList icon={<TbMessageChatbot size={30} />} type={'Greeting message'} desc={'Welcome new customers automatically'} />
          <MarketList icon={<FaUmbrellaBeach size={30} />} type={'Away message'} desc={'Reply automatically when you are away'} />
          <MarketList icon={<BsFillLightningChargeFill size={30} />} type={'Quick replies'} desc={'Reuse frequent messages'} />
          <MarketList icon={<MdLabel size={30} />} type={'Labels'} desc={'Organize chats and customers'} />
          <hr />
          <MarketList icon={<FaRegCircleQuestion size={25} />} type={'Help center'} desc={'Get help, contact us'} />
    </div>
  )
}

export default Tools
