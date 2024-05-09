"use client"
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

export default function page() {
    
    const [list, setList] = useState([]);
    const [scroll, setScroll] = useState(0);
    const topMostHiddenDivRef = useRef();    
    function renderCard(startIndex, endIndex) {
        const newList = [];

        for(let index = startIndex; index <= endIndex; index++) {
            if(index < 0 )continue;
            const top= (180*index + 80);
            newList.push(
                <div style={{ top: top + "px"}} className={`${index} ${top} absolute card h-[100px] w-[100px] mx-auto bg-fuchsia-400 text-center text-2xl left-1/2 -translate-x-1/2 `}>{index}</div>
            )
        }

        setList(newList);
    }

    useEffect(() => {
        const scrollTop = scroll;
        const startIndex = Math.floor(scrollTop / 180);
        const endIndex = startIndex + 10;
        renderCard(startIndex, endIndex);
    },[scroll])

    const containerRef = useRef();
    useEffect(() => {
        if(!containerRef.current) return;

        renderCard(0,10);

        const scrollObserver = new IntersectionObserver((args) => {
            const topMostHiddenDiv = args[0];
            let scrollTop = topMostHiddenDiv.boundingClientRect.top
            setScroll(scrollTop === 0 ? scrollTop : scrollTop * -1 );
            scrollObserver.disconnect();
        },{ 
            root: containerRef.current
        })

        const cardObserver = new IntersectionObserver((cards) => {
            scrollObserver.observe(topMostHiddenDivRef.current);
        },{
            root: containerRef.current,
        })

        containerRef.current.querySelectorAll('.card').forEach((card) => {
            cardObserver.observe(card);
        })

        return () => {
            cardObserver.disconnect();
        }

    },[containerRef.current])

  return (
    <div ref={containerRef} className=" relative h-screen w-screen overflow-y-scroll">
    <div ref={topMostHiddenDivRef} className="top_most_hidden_div"></div>
    {console.log(scroll)}
     {list}
    </div>
  )
}
