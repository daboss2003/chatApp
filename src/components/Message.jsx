import React, { useContext, lazy , Suspense } from 'react'
import { displayContext, SwiperContext, ViewContext } from '../context/context'
import LoaderBg from './LoaderBg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';





const AllMessages = lazy(() => import('./AllMessages'))
const Status =  lazy(() => import('./Status'))
const UserAccSettings = lazy(() => import('./UserAccSettings'))
const NewChat =  lazy(() => import('./NewChat'))
const Notifications = lazy(() => import('./Notifications'))
const Tools = lazy(() => import('./Tools'))
const Updates = lazy(() => import('./Updates'))
const Call = lazy(() => import('./Call'))

function Message() {
  const display = useContext(displayContext);
  const swiperRef = useContext(SwiperContext);
  const globalView = useContext(ViewContext);
  
  return (
    <div className={`md:max-h-[92vh] md:h-[92vh] lg:basis-[40%] md:basis-[50%] bg-white dark:bg-dark md:border-r shadow-md md:rounded-l-xl  dark:border-blueColor md:rounded-bl-none pt-5 md:px-5 h-[82vh] w-full overflow-hidden ${!globalView.showNav ? 'h-screen' : ''}`}>
      <Suspense fallback={<LoaderBg><h2 className='text-lg tracking-wide font-bold gap-4'>Loading...</h2></LoaderBg>}>
        {window.innerWidth >= 768 &&
          <>
            {display.active === 1 && <AllMessages type={'chat'}  />}
            {display.active === 2 && <Notifications /> }
            {display.active === 3 && <Status /> }
            {display.active === 4 &&  <AllMessages type={'starred'}  />}
            {display.active === 5 &&  <AllMessages type={'archieve'}   />}
            {display.active === 6 && <UserAccSettings />}
            {display.active === 7 &&  <NewChat /> }
          </>
        }

        {window.innerWidth < 768 && 
          <>
           {display.active === 7 && <NewChat />}
          {display.active !== 7 && 
             <Swiper className='w-full h-full' ref={swiperRef}>
            <SwiperSlide>
              <AllMessages type={'chat'} />
            </SwiperSlide>
           <SwiperSlide>
              <Call />
            </SwiperSlide>
              <SwiperSlide>
                <Updates />
              </SwiperSlide>
              <SwiperSlide>
                <Tools />
              </SwiperSlide>
          </Swiper>
          }
          </>
          
         
        }
      </Suspense>
    </div>
  )
}

export default Message
