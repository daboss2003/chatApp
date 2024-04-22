import React from 'react'

function Button({onClick, children, type}) {
  return (
      <button onClick={onClick} className={`dark:text-blueColor bg-inherit hover:bg-gray-200 dark:hover:bg-darkLight p-2 cursor-pointer ${type === 'call' ? 'border py-2 px-4 dark:border-blueColor' : ''} ${type === 'back' ? 'md:hidden' : ''}`}>{ children}</button>
  )
}

export default Button
