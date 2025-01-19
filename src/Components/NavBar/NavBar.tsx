import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import { useAppDispatch, useAppSelector } from "../Hooks/hooks";
import { setVisible, setVisibleBanner } from "../../Redux/States/stateSlice";
import { Link } from "react-router-dom";

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 rgba(128, 0, 128, 0.6);
  }
  50% {
    box-shadow: 0 10px 40px 5px rgba(128, 0, 128, 0.6);
  }
  100% {
    box-shadow: 0 0 0 rgba(128, 0, 128, 0.6);
  }
`;

const BackGround = styled.div`
  width: 100vw;
  height: 60vh;
  position: absolute;
  bottom: 0;
  z-index: -2;
  background-color: #444242;
`;

const RetNav = styled.div<{ $isAnimating: boolean }>`
  width: 100%;
  height: 50vh;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  background: linear-gradient(180deg, #000000 0%, #000000 1%, #2d2a2a 90%);
  position: relative;
  display: flex;
  justify-content: center;
  z-index: 2;

  ${({ $isAnimating }) =>
    $isAnimating &&
    css`
      @media screen and (max-width: 992px) {
        animation: ${pulseAnimation} 1.5s ease-in-out infinite;
      }
    `}
`;

const OvalNav = styled.div`
  width: 80px;
  height: 75px;
  border-radius: 100%;
  position: absolute;
  z-index: 3;
  bottom: -35px;
  left: 50vw;
  cursor: pointer;

  @media screen and (max-width: 1024px) {
    width: 80px;
    height: 75px;
    bottom: -30px;
    left: 46%;
  }

  @media screen and (max-width: 992px) {
    width: 70px;
    height: 65px;
    bottom: -30px;
    left: 46%;
  }

  @media screen and (max-width: 767px) {
    width: 60px;
    height: 55px;
    bottom: -25px;
    left: 41%;
  }
`;

const ShadowOval = styled.div<{ $isVisible: boolean; $isAnimating: boolean }>`
  position: absolute;
  width: 90px;
  height: 85px;
  border-radius: 100%;
  z-index: -1;
  top: 49%;
  left: 52%;
  transform: translate(-50%, -50%);
  visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
  transition: visibility 0.3s ease;

  ${({ $isAnimating }) =>
    $isAnimating &&
    css`
      @media screen and (max-width: 992px) {
        animation: ${pulseAnimation} 1.5s ease-in-out infinite;
      }
    `}

  @media screen and (max-width: 1024px) {
    width: 80px;
    height: 75px;
    bottom: -30px;
    left: 46%;
  }

  @media screen and (max-width: 992px) {
    width: 75px;
    height: 75px;
    bottom: -20px;
    left: 50.5%;
  }

  @media screen and (max-width: 767px) {
    width: 70px;
    height: 65px;
    bottom: -30px;
    left: 50%;
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

  const isClicked = useAppSelector((state) => state.myState.isVisible);
  const dispatch = useAppDispatch();

  const [isShadowVisible, setIsShadowVisible] = useState(true);
  const [isFirst, setIsFirst] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  const handleScrollToBottom = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  useEffect(() => {
    let gsapAnimation: GSAPTween | null = null;

    const handleMouseEnter = () => {
      if (ovalNavRef.current && !isClicked) {
        gsapAnimation?.kill();
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

    const reduceRetNav = () => {
      gsap.to(retNavRef.current, {
        height: "8vh",
        duration: 1,
        delay: 0.5,
      });

      gsap.to(backgroundRef.current, {
        height: "0vh",
        duration: 1,
        delay: 0.5,
        onComplete: () => {
          backgroundRef.current?.setAttribute("display", "none");
        },
      });
    };

    const handleClick = () => {
      if (ovalShadowRef.current && retNavRef.current) {
        ovalShadowRef.current.style.boxShadow = "0 0 0 rgba(0, 0, 0, 0.0)";
        retNavRef.current.style.boxShadow = "0 0 0 rgba(0, 0, 0, 0.0)";
      }

      setIsAnimating(false);
      setIsShadowVisible(false);
      handleMouseLeave();
      reduceRetNav();
      if (isFirst) {
        setTimeout(() => {
          dispatch(setVisible(true));
          dispatch(setVisibleBanner(true));
        }, 1000);
      }
      setIsFirst(false);
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
      <ShadowOval
        $isAnimating={isAnimating}
        ref={ovalShadowRef}
        $isVisible={isShadowVisible}
      />
      <RetNav $isAnimating={isAnimating} ref={retNavRef}>
        <Link to="/" onClick={() => handleScrollToBottom()}>
          <OvalNav ref={ovalNavRef}>
            <OvalImage src="/Png/groupReact.png" alt="Immagine" />
          </OvalNav>
        </Link>
      </RetNav>
      <BackGround ref={backgroundRef} />
    </>
  );
};

export default NavBar;
