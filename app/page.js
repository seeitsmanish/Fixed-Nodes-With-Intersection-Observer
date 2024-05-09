"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Card from "./Card";
import products from "./data";

export default function Home() {

  const [list, setList] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [numberOfCards, setNumberOfCards] = useState(0);

  const containerRef = useRef();
  const topMostHiddenDivRef = useRef();

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const numberOfCardsToRender = Math.ceil(containerRef.current.clientHeight / 350) + 1;
    setNumberOfCards(numberOfCardsToRender);
    renderList(0, numberOfCardsToRender)
  }, [])

  useEffect(() => {
    if (!containerRef.current) return;

    var topHiddenDivObserver = new IntersectionObserver((args) => {
      const topHiddenDiv = args[0];
      let scrollTop = topHiddenDiv.boundingClientRect.top;
      doCalculationsAndRenderList(scrollTop);
      topHiddenDivObserver.disconnect();
    })

    var cardsObserver = new IntersectionObserver((card) => {
      topHiddenDivObserver.observe(topMostHiddenDivRef.current);
    })

    containerRef.current.querySelectorAll('.card').forEach(card => {
      cardsObserver.observe(card);
    })

    return () => {
      cardsObserver.disconnect();
      topHiddenDivObserver.disconnect();
    }

  }, [list, scrollPosition, containerRef])


  // Calculates scrollTop, startIndex, endIndex and renders cards acc.
  function doCalculationsAndRenderList(scrollTop) {
    scrollTop = scrollTop === 0 ? scrollTop : -1 * scrollTop;
    if (scrollTop === scrollPosition) return;
    const startIndex = Math.floor(scrollTop / 350);
    const endIndex = startIndex + numberOfCards;
    console.log(startIndex, endIndex);
    renderList(startIndex, endIndex);
    setScrollPosition(scrollTop);
  }

  // Renders list from starting index to ending index
  function renderList(startIndex, endIndex) {
    const newList = [];
    for (let index = startIndex; index <= endIndex; index++) {
      if (index >= products.length) {
        continue;
      }
      const top = index * 350 + 50;
      newList.push(
        <Card className={index === startIndex ? "card_to_observe" : ""} top={top + "px"} key={index} index={index} {...products[index]} />
      )
    }
    setList(newList)
  }

  return (
    <div className="relative h-screen w-screen overflow-y-scroll" ref={containerRef}>
      <div ref={topMostHiddenDivRef} className="top_most_hidden_div"></div>
      {list}
      <div className="fixed top-0 left-0">Scroll Position: {scrollPosition}px</div>
    </div>
  );
}
