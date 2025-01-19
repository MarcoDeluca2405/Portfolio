import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../Hooks/hooks";
import gsap from "gsap";
import { addAnimation } from "../../Redux/States/stateSlice";

const DivHeroSection = styled.div`
  width: 60%;
  /* background-color: red; */
  display: inline-grid;
  grid-template-columns: 60% 40%;
  row-gap: 50px;
  margin-top: 20px;
`;

const DivDescription = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: green; */
`;

const DivImage = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  top: -55px;

  @media screen and (max-width: 992px) {
    top: -23px;
  }

  @media screen and (max-width: 768px) {
    top: 0px;
  }

  /* background-color: blue; */
`;

const TextLabel = styled.h2`
  width: 100%;
  margin-left: 20px;
  font-size: 30px;
  background: linear-gradient(to right, #ffffff, #cccccc, #c9c9c9, #999999);
  -webkit-background-clip: text;
  color: transparent;

  @media screen and (max-width: 992px) {
    font-size: 23px;
  }

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const HeroSection = () => {
  const divHeroRef = useRef<HTMLDivElement>(null);
  const divDescriptionRef = useRef<HTMLDivElement>(null);
  const divImageRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const isVisible = useAppSelector((state) => state.myState.isVisible);

  let tl = gsap.timeline();

  useEffect(() => {
    if (divHeroRef.current && isVisible) {
      gsap.set(divHeroRef.current, { y: 500, opacity: 0 });
      gsap.set(divDescriptionRef.current, { x: -200, opacity: 0 });
      gsap.set(divImageRef.current, { x: 200, opacity: 0 });
      tl.to(divHeroRef.current, { y: 0, opacity: 1, duration: 1 }).to(
        [divDescriptionRef.current, divImageRef.current],
        {
          x: 0,
          opacity: 1,
          onComplete: () => {
            dispatch(
              addAnimation({
                isComplete: true,
                nameAnimation: "HeroSectionAnimated",
              })
            );
          },
        }
      );

      return () => {
        tl.kill();
      };
    }
  }, [isVisible]);

  return (
    <>
      <DivHeroSection ref={divHeroRef}>
        <DivDescription ref={divDescriptionRef}>
          <TextLabel>Marco De luca</TextLabel>
          <TextLabel>Programmatore Full-Stack</TextLabel>
        </DivDescription>
        <DivImage ref={divImageRef}>
          <Image src="/public/Png/profilo.png" />
        </DivImage>
      </DivHeroSection>
    </>
  );
};

export default HeroSection;
