import React from 'react'

function MarketList({icon, type , desc}) {
  return (
    <div className='flex items-center gap-4 p-3 hover:bg-gray-200'>
          <button className='text-colorTeal'>{icon}</button>
          <div className='flex flex-col gap-1'>
              <h2 className='text-lg font-medium text-dark'>{type}</h2>
              <p className='text-sm'>{ desc}</p>
          </div>
    </div>
  )
}

export default MarketList
