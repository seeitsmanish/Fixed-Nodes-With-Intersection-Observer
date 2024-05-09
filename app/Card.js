import React from 'react'

export default function Card({ className, top, images, index, title, price, description }) {
  return (
    <div style={{
      top: top,
    }} className={` ${className} card h-[300px] w-[300px] bg-slate-100 text-black overflow-hidden absolute left-1/2 -translate-x-1/2`}>
      <img className="h-[150px] w-full object-cover" src={images[index % 4]} alt={title} />
      <div className='px-2 flex h-[20px] justify-between mt-[30px]'>
        <p className='text-xl'>{title}</p>
        <p>${price}</p>
      </div>

      <div className="px-2 description mt-[50px] h-[80px] mb-[20px]">
        {description}
      </div>
    </div>
  )
}
