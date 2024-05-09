import React from 'react'
import products from "../data";
import Card from '../Card';
export default function page() {
  return (
    <div className="h-full w-full flex justify-center items-center">
    <div className="full-height-container h-screen w-1/2 bg-slate-600 overflow-auto">
      <div className="product-list h-full w-full relative">
        {products.map((product, index) => {
            return <Card key={index} {...product} index={index} top={ (index*350 + 50) + "px"}/>
        })}
      </div>
    </div>
  </div>
  )
}
