import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";


const BackGround = styled.div`
    width: 100vw;
    height: 60vh;
    position: absolute;
    bottom: 0;
    z-index: -2;
    background-color: #444242;
`

const RetNav = styled.div`
  width: 100vw;
  height: 50vh;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  background: linear-gradient(180deg, #000000 0%, #000000 1%, #2D2A2A 90%);
  position: relative;
  display: flex;
  justify-content: center;
  z-index: 2;
`;

const OvalNav = styled.div`
  width: 100px;
  height: 95px;
  border-radius: 100%;
  position: absolute;
  z-index: 3;
  bottom: -50px;
  cursor: pointer;


  @media screen and (max-width: 768px){
    width: 70px;
    height: 65px;
    bottom: -30px;
  }

  @media screen and (max-width:992px){
    width: 80px;
    height: 75px;
    bottom: -30px;
}

`;

const ShadowOval = styled.div<{ isVisible: boolean }>`
  position: absolute;
  width: 100px;
  height: 95px;
  border-radius: 100%;
  z-index: -1;
  top: 49%;
  left: 50%;
  transform: translate(-50%, -50%);
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  transition: visibility 0.3s ease;

  
  @media screen and (max-width: 768px){
    width: 70px;
    height: 65px;
    bottom: -30px;
  }

  @media screen and (max-width:992px){
    width: 80px;
    height: 75px;
    bottom: -30px;
}

`;

const OvalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const NavBar: React.FC = () => {
  const retNavRef = useRef<HTMLDivElement>(null);
  const ovalNavRef = useRef<HTMLDivElement>(null);
  const ovalShadowRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const [isClicked, setIsClicked] = useState(false);
  const [isShadowVisible, setIsShadowVisible] = useState(true);

  useEffect(() => {
    let gsapAnimation: GSAPTween | null = null;

    const handleMouseEnter = () => {
      if (ovalNavRef.current && !isClicked) {
        gsapAnimation = gsap.to([retNavRef.current, ovalShadowRef.current], {
          boxShadow: "0 10px 40px 5px rgba(128, 0, 128, 0.6)",
          duration: 1,
          yoyo: true,
          repeat: -1,
          ease: "power1.inOut",
        });
      }
    };

    const handleMouseLeave = () => {
      if (gsapAnimation) {
        gsapAnimation.reverse().eventCallback("onComplete", () => {
          gsapAnimation?.kill();
          gsap.to([retNavRef.current, ovalShadowRef.current], {
            clearProps: "all",
          });
        });
      }
    };

    const reduceRetNav = () =>{
        gsap.to(retNavRef.current, {
            height: "8vh",
            duration: 1, 
            delay: 0.5, 
          });

        gsap.to(backgroundRef.current,{
            height:"0vh",
            duration: 1,
            delay:0.5,
            onComplete: ()=>{
                backgroundRef.current?.setAttribute("display","none")
            }
        })
          
    }

    const handleClick = () => {
      setIsClicked(true); 
      setIsShadowVisible(false);
      handleMouseLeave();
      reduceRetNav(); 
    };

    const ovaNavElm = ovalNavRef.current;

    if (ovaNavElm && !isClicked) {
      ovaNavElm.addEventListener("mouseenter", handleMouseEnter);
      ovaNavElm.addEventListener("mouseleave", handleMouseLeave);
      ovaNavElm.addEventListener("click", handleClick); // Gestione del clic
    }

    // Cleanup degli event listeners quando il componente viene smontato
    return () => {
      if (ovaNavElm && !isClicked) {
        ovaNavElm.removeEventListener("mouseenter", handleMouseEnter);
        ovaNavElm.removeEventListener("mouseleave", handleMouseLeave);
        ovaNavElm.removeEventListener("click", handleClick);
      }
    };
  }, [isClicked]);

  return (
    <>
      <ShadowOval ref={ovalShadowRef} isVisible={isShadowVisible} />
      <RetNav ref={retNavRef}>
        <OvalNav ref={ovalNavRef}>
          <OvalImage src="/public/Png/groupReact.png" alt="Immagine" />
        </OvalNav>
      </RetNav>
    <BackGround ref={backgroundRef}/>
    </>
  );
};

export default NavBar;
