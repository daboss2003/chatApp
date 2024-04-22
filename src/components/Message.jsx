import React, { useContext, lazy , Suspense } from 'react'
import { displayContext } from '../context/context'
import LoaderBg from './LoaderBg'


const AllMessages = lazy(() => import('./AllMessages'))
const Status =  lazy(() => import('./Status'))
const UserAccSettings = lazy(() => import('./UserAccSettings'))
const NewChat =  lazy(() => import('./NewChat'))
const Notifications =  lazy(() => import('./Notifications'))

function Message() {
  const display = useContext(displayContext);
  return (
    <div className='md:max-h-[92vh] md:h-[92vh] lg:basis-[40%] md:basis-[50%] bg-white dark:bg-dark md:border-r shadow-md md:rounded-l-xl  dark:border-blueColor md:rounded-bl-none pt-5 md:px-5 h-[82vh] w-full overflow-hidden'>
      <Suspense fallback={<LoaderBg><h2 className='text-lg tracking-wide font-bold gap-4'>Loading...</h2></LoaderBg>}>
        {display.active === 1 && <AllMessages type={'chat'}  />}
        {display.active === 2 && <Notifications /> }
        {display.active === 3 && <Status /> }
        {display.active === 4 &&  <AllMessages type={'starred'}  />}
        {display.active === 5 &&  <AllMessages type={'archieve'}   />}
        {display.active === 6 && <UserAccSettings />}
        {display.active === 7 &&  <NewChat /> }
      </Suspense>
    </div>
  )
}

export default Message
