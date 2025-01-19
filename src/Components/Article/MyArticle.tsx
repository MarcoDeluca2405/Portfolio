import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { useAppDispatch, useAppSelector } from "../Hooks/hooks";
import { addAnimation } from "../../Redux/States/stateSlice";

const DivContainer = styled.div`
  width: 90%;
  height: 600px;
  display: flex;
  /* background-color: red; */
  margin-bottom: 50px;
  margin-top: 550px;
  position: relative;
  align-items: center;
  justify-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.h2`
  font-size: 50px;
  opacity: 0;

  @media screen and (max-width: 1024px) {
    font-size: 45px;
  }

  @media screen and (max-width: 992px) {
    font-size: 40px;
  }
  @media screen and (max-width: 767px) {
    font-size: 30px;
  }
`;

const Image = styled.img`
  /* width: 300px;
       height: 450px; */
  margin: 0 auto;
  position: absolute;
  bottom: 0;
  /* right: 0; */
  max-width: 70%;
  max-height: 70%;
  transition: all 0.3 ease;

  @media screen and (max-width: 1024px) {
    max-width: 60%;
    max-height: 60%;
  }

  @media screen and (max-width: 992px) {
    max-width: 55%;
    max-height: 55%;
  }
  @media screen and (max-width: 767px) {
    max-width: 50%;
    max-height: 50%;
  }
`;

const MyArticle = () => {
  var mm = gsap.matchMedia();

  const divRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const isVisible = useAppSelector((state) => state.myState.isVisible);

  const [isComplete, setIsComplete] = useState(false);
  const [isCompleteImage, setIsCompleteImage] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isVisible && !isComplete && !isCompleteImage) {
      setTimeout(() => PlayAnimation(), 1000);
    }

    if (isComplete && !isCompleteImage) {
      PlayAnimationImage();
    }

    if (isCompleteImage) {
      PlayAnimationHeader();
    }
  }, [isVisible, isComplete, isCompleteImage]);

  const PlayAnimation = () => {
    mm.add(
      {
        // Media query per dispositivi grandi
        isDesktop: "(min-width: 993px)",
        // Media query per tablet
        isTablet: "(max-width: 992px) and (min-width: 768px)",
        // Media query per smartphone
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        let { isDesktop, isTablet, isMobile }: any = context.conditions;

        var yI = -150;

        if (isTablet) {
          yI = -130;
        }
        if (isMobile) {
          yI = -90;
        }

        if (divRef.current != null) {
          const div = divRef.current;
          const image = imageRef.current;

          gsap.set(image, { y: yI });

          gsap.fromTo(
            div,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 1,
              scrollTrigger: {
                trigger: div,
                start: "top 70%",
                end: "top 20%",
                scrub: 0.6,

                toggleActions: "play none none none",
                once: false,
              },
              onComplete: () => {
                setTimeout(() => setIsComplete(true), 200);
              },
            }
          );
        }
      }
    );
  };

  const PlayAnimationImage = () => {
    const image = imageRef.current;
    const container = divRef.current;

    mm.add(
      {
        // Media query per dispositivi grandi
        isDesktop: "(min-width: 993px)",
        // Media query per tablet
        isTablet: "(max-width: 992px) and (min-width: 768px)",
        // Media query per smartphone
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        let { isDesktop, isTablet, isMobile }: any = context.conditions;

        var yI = -150;
        var position = 0;

        if (isTablet) {
          yI = -130;
          position = 1000;
        }
        if (isMobile) {
          yI = -40;
          position = 2000;
        }

        if (image && container) {
          var containerRect = container.getBoundingClientRect();

          gsap.fromTo(
            image,
            {
              x: 0,
              y: yI,
            },
            {
              x: containerRect.width * 0.45,
              y: (containerRect.height - position) * 0.15,
              duration: 2.0,
              ease: "power3.out",
              onComplete: () => {
                container.style.alignItems = "flex-start";
                image.style.bottom = "0px";
                setIsCompleteImage(true);
              },
            }
          );
        }
      }
    );
  };

  const PlayAnimationHeader = () => {
    const header = headerRef.current;
    if (header) {
      gsap.fromTo(
        header,
        {
          opacity: 0,
          x: -200,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          onComplete: () => {
            dispatch(
              addAnimation({ isComplete: true, nameAnimation: "AnArticle" })
            );
          },
        }
      );
    }
  };

  return (
    <>
      <DivContainer ref={divRef}>
        <HeaderTitle ref={headerRef}>Cosa Offro?</HeaderTitle>

        <Image ref={imageRef} src="/Layout/pensa.png" />
      </DivContainer>
    </>
  );
};

export default MyArticle;
