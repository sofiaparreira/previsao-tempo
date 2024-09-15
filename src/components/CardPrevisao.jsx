import React from 'react'

const CardPrevisao = ({date, temperature, km }) => {
  return (
    <div className='bg-gray-900  bg-opacity-65 text-white flex justify-between w-1/2 mx-auto rounded-2xl px-8 py-3 text-lg'>
      <span>{date}</span>
      <span>{temperature}</span>
      <span>{km}</span>
    </div>
  )
}

export default CardPrevisao
