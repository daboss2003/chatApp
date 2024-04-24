import React, { useContext } from 'react'
import { EffectContext, ViewContext } from '../context/context';

function NavBtn({ children, num = 0, activeBtn = false, handleClick = () => null, isUser = false, type=null }) {
  const effect = useContext(EffectContext);
  const globalView = useContext(ViewContext);
  function handleButtonClick() {
    if (type === null) {
      handleClick(prev => {
      if (prev === num) {
        return prev
      }
      else {
        effect.setSelectedChat(null);
        return num
      }
    })
    }
    if(type === 'update') {
      handleClick()
    }
    if (window.innerWidth < 768) {
      globalView.setView('chats');
    } 
    else globalView.setView('')
    
    
    
  }
    return (
      <button className={`${activeBtn === num ? 'after:absolute after:bg-blueColor after:py-4 after:w-[2px] after:rounded-lg after:left-0 bg-gray-200 dark:bg-darkLight' : "" } hover:bg-gray-200 dark:hover:bg-darkLight text-gray-500 dark:text-blueColor rounded-md py-3 relative flex justify-center items-center px-3 ${isUser ? 'hidden xs:flex' : ''}`} onClick={handleButtonClick}>
          {children}
      </button>
    )

  
}

export default NavBtn
