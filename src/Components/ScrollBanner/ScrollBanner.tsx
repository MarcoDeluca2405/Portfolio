import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../Hooks/hooks";
import listIcons from "../../iconsList.json";
import gsap from "gsap";

const DivBanner = styled.div<{ $isComplete: boolean }>`
  width: 100%;
  height: 40px;
  /* border: 0.2px solid lightgray;
    background-color: yellow; */
  display: ${({ $isComplete }) => ($isComplete ? "block" : "none")};
  margin: 0 auto;
  margin-top: 40px;
  align-items: baseline;
  overflow: hidden;
  position: sticky;
  top: 50px;
  z-index: -1;

  @media screen and (max-width: 1024px) {
    height: 35px;
  }

  @media screen and (max-width: 992px) {
    height: 30px;
  }
  @media screen and (max-width: 767px) {
    height: 25px;
  }
`;

const DivScroll = styled.div`
  width: 200%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  margin-right: -25%;
`;

const DivIcons = styled.div`
  height: 100%;
  display: inline-block;
  margin-right: 35px;
  flex: 0 0 auto;

  @media screen and (max-width: 1024px) {
    margin-right: 30px;
  }

  @media screen and (max-width: 992px) {
    margin-right: 25px;
  }
  @media screen and (max-width: 767px) {
    margin-right: 20px;
  }
`;

const ImageIcon = styled.img`
  width: auto;
  height: 100%;
  object-fit: contain;
`;

const DivProva = styled.div`
  height: 900px;
`;

const ScrollBanner = () => {
  const stateAN = useAppSelector((state) => state.myState.Animation);
  const [isComplete, setIsComplete] = useState(false);

  const divBanerRef = useRef<HTMLDivElement>(null);
  const divScrollRef = useRef<HTMLDivElement>(null);

  const stateVisibleBanner = useAppSelector(
    (state) => state.myState.isVisibleBanner
  );

  let scrollSpeed = 100;
  const friction = 0.5;

  var tl1 = gsap.timeline();

  const applyFriction = () => {
    if (Math.abs(scrollSpeed) > 0.1) {
      scrollSpeed *= friction;
      gsap.to(divScrollRef.current, {
        xPercent: `+=${scrollSpeed}`,
        ease: "none",
        duration: 0.2, // Durata breve per aggiornamenti fluidi
        onComplete: applyFriction,
      });
    } else {
      scrollSpeed = 0; // Ferma l'animazione quando la velocità è minima
    }
  };

  useEffect(() => {
    if (
      stateVisibleBanner &&
      stateAN[0] &&
      stateAN[0].isComplete !== isComplete
    ) {
      setIsComplete(stateAN[0].isComplete);
      PlayAnimation();
    }
  }, [stateAN, isComplete, stateVisibleBanner]);

  useEffect(() => {
    stateVisibleBanner ? VisibleBanner() : HideBanner();
    console.log(stateVisibleBanner);
  }, [stateVisibleBanner]);

  const VisibleBanner = () => {
    const div = divBanerRef.current;
    if (div) {
      gsap.to(div, {
        opacity: 1,
        duration: 0.5,
      });
    }
  };

  const HideBanner = () => {
    const div = divBanerRef.current;
    if (div) {
      gsap.to(div, {
        opacity: 0,
        duration: 0.5,
      });
    }
  };

  const PlayAnimation = () => {
    if (divBanerRef.current != null && divScrollRef.current != null) {
      var currentDivBanner = divBanerRef.current;
      var currentDivScroll = divScrollRef.current;

      tl1
        .set(currentDivBanner, { opacity: 0 })
        .to(currentDivBanner, { opacity: 1, delay: 0.5 });

      gsap.to(currentDivScroll, {
        xPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: currentDivBanner,
          start: "top top",
          end: () =>
            `+=${document.documentElement.scrollHeight - window.innerHeight}`,
          scrub: 2.5,
          onUpdate: (self) => {
            // if (self.progress === 1) {
            //     gsap.set(currentDivScroll, { xPercent: 0 });
            // }
            scrollSpeed = self.getVelocity() / 2500;
          },
          onLeave: () => {
            requestAnimationFrame(() => applyFriction());
          },
        },
      });
    }
  };

  return (
    <>
      <DivBanner $isComplete={isComplete} ref={divBanerRef}>
        <DivScroll ref={divScrollRef}>
          {Array(4)
            .fill(listIcons)
            .flat()
            .map((el, index) => {
              return (
                <DivIcons key={index}>
                  <ImageIcon src={el} />
                </DivIcons>
              );
            })}
        </DivScroll>
      </DivBanner>

      {/* <DivProva />  */}
    </>
  );
};

export default ScrollBanner;
