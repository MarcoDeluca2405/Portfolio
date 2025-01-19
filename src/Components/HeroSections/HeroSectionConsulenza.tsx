import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { useSelector } from "react-redux";
import { useAppSelector } from "../Hooks/hooks";

const ContainerDiv = styled.div`
  width: 90%;
  height: 400px;
  /* background-color: orange; */
  margin-bottom: 250px;
  margin-top: 750px;
  display: flex;
  opacity: 0;
`;

const ContainerImg = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: red; */
  position: relative;
`;

const Image = styled.img`
  max-width: 90%;
  max-height: 100%;
  background-size: contain;
  box-shadow: 20px 15px 30px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
`;

const ContainerText = styled.div`
  width: 90%;
  height: 100%;
  margin-top: 20px;
  /* background: blue; */
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  width: 100%;
  font-size: 40px;
  white-space: nowrap;
  margin-bottom: 70px;

  @media screen and (max-width: 992px) {
    font-size: 30px;
    margin-top: 5px;
    margin-bottom: 70px;
  }

  @media screen and (max-width: 768px) {
    font-size: 20px;
    margin-top: 50px;
    margin-bottom: 30px;
  }
`;

const Description = styled.p`
  width: 100%;

  text-align: left;
  word-spacing: 5px;
`;

const HeroSectionConsulenza = () => {
  const containerDivRef = useRef<HTMLDivElement>(null);
  const TitleRef = useRef<HTMLHRElement>(null);
  const ParagraphRef = useRef<HTMLParagraphElement>(null);

  const [isComplete, setIsComplete] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const isVisible = useAppSelector((state) => state.myState.isVisible);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 500); // Ritardo di 500ms per sicurezza
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isReady) {
      PlayAnimation();
    }
  }, [isReady]);

  useEffect(() => {
    console.log("complete");
    console.log(isComplete);
    if (isComplete) {
      PlayAnimationText();
    }
  }, [isComplete]);

  const PlayAnimation = () => {
    if (containerDivRef.current) {
      gsap.fromTo(
        containerDivRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2,
          scrollTrigger: {
            trigger: containerDivRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 0.6,

            toggleActions: "play none none none",
            once: false,
          },
        }
      );

      gsap.fromTo(
        TitleRef.current,
        { x: 500, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: containerDivRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 0.2,
            toggleActions: "play none none none",
            once: false,
          },
          onComplete: () => {
            console.log("Animation completed!");
            setIsComplete(true);
          },
        }
      );
    }
  };

  const PlayAnimationText = () => {
    if (ParagraphRef.current) {
      gsap.set(ParagraphRef.current, { opacity: 0 });
      gsap.to(ParagraphRef.current, {
        duration: 2,
        opacity: 1,
        text: {
          value:
            "Supporto e consulenza per trovare le soluzioni tecnologiche più adatte alle tue esigenze.",
          newClass: "class2",
          delimiter: "",
        },
      });
    }
  };

  return (
    <>
      <ContainerDiv ref={containerDivRef}>
        <ContainerImg>
          <Image src="/Layout/consulenza.png" />
        </ContainerImg>
        <ContainerText>
          <Title ref={TitleRef}>Consulenza Tecnica</Title>
          <Description ref={ParagraphRef}></Description>
        </ContainerText>
      </ContainerDiv>
    </>
  );
};

export default HeroSectionConsulenza;
