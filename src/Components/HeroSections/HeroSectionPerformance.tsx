import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../Hooks/hooks";
import { addAnimation } from "../../Redux/States/stateSlice";

const ContainerDiv = styled.div`
  width: 90%;
  height: 400px;
  /* background-color: orange; */
  margin-bottom: 250px;
  margin-top: 750px;
  display: flex;
  opacity: 0;
  position: relative;
`;

const ContainerImg = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: red; */
  position: absolute;
  top: 0px;
`;

const Image = styled.img`
  /* max-width: 100%; */
  height: 550px;
  width: 550px;
  position: relative;
  background-size: contain;

  @media screen and (max-width: 1024px) {
    height: 450px;
    width: 450px;
  }

  @media screen and (max-width: 992px) {
    height: 400px;
    width: 400px;
  }

  @media screen and (max-width: 767px) {
    height: 250px;
    width: 250px;
    top: -30px;
  }

  @media screen and (max-width: 350px) {
    height: 250px;
    width: 250px;
    top: 0px;
    left: 5px;
  }

  /* box-shadow: 20px 15px 30px rgba(0,0,0,0.5); */
  /* border-radius: 50%; */
`;

const ContainerText = styled.div`
  width: 90%;
  height: 100%;
  margin-left: 10px;
  /* background: blue; */
  display: flex;
  flex-direction: column;
  visibility: hidden;
`;

const Title = styled.h1`
  width: 100%;
  font-size: 40px;
  white-space: nowrap;
  margin-bottom: 70px;
  position: relative;

  @media screen and (max-width: 992px) {
    font-size: 30px;
    margin-top: 5px;
    margin-bottom: 70px;
  }

  @media screen and (max-width: 767px) {
    font-size: 18px;
    margin-top: 50px;
    left: 10px;
    margin-bottom: 30px;
  }

  @media screen and (max-width: 350px) {
    font-size: 15.5px;
    left: 16px;
    top: 25px;
  }
`;

const Description = styled.p`
  width: 100%;

  text-align: left;
  word-spacing: 5px;
  margin-left: 30px;
`;

const HeroSectionPerformance = () => {
  const containerDivRef = useRef<HTMLDivElement | null>(null);
  const ContainerTextRef = useRef<HTMLDivElement | null>(null);
  const ImageDiv = useRef<HTMLDivElement | null>(null);
  const ImageEl = useRef<HTMLImageElement | null>(null);
  const TitleRef = useRef<HTMLHRElement | null>(null);
  const ParagraphRef = useRef<HTMLParagraphElement | null>(null);

  const [isCompleteScroll, setIsCompleteScroll] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const isVisible = useAppSelector((state) => state.myState.isVisible);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isVisible && !isCompleteScroll && !isComplete) {
      setTimeout(() => PlayAnimation(), 500);
    }

    if (isCompleteScroll && !isComplete) {
      PlayAnimationImage();
    }

    if (isComplete) {
      PlayAnimationText();
    }
  }, [isVisible, isComplete, isCompleteScroll]);

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
          onComplete: () => {
            setIsCompleteScroll(true);
          },
        }
      );
    }
  };

  const PlayAnimationImage = () => {
    var image = ImageEl.current;
    var title = TitleRef.current;
    var containerText = ContainerTextRef.current;

    var tl = gsap.timeline();

    var mm = gsap.matchMedia();

    if (image && title && containerText) {
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

          // Imposta le dimensioni in base alla media query
          let widthImage = 450;
          let heightImage = 450;
          let pX = "-33vw";
          let pTX = "40vw";
          let pTY = -100;
          let tTX = 0;

          if (isTablet) {
            widthImage = 270;
            heightImage = 270;
            pX = "-30vw";
            pTX = "30vw";
            pTY = -10;
            tTX = 50;
          }
          if (isMobile) {
            widthImage = 200;
            heightImage = 200;
            pX = "0";
            pTX = "12vw";
            pTY = -20;
          }

          // Crea timeline per ogni condizione
          var tl = gsap.timeline();

          // Prima animazione (effetto border e shadow)
          tl.fromTo(
            image,
            {
              borderRadius: "0%",
              boxShadow: "10px 10px 20px rgba(0,0,0,0.0)",
            },
            {
              duration: 1.0,
              borderRadius: "50%",
              boxShadow: "0px 0px 70px rgba(0,0,0,1)",
            }
          );

          // Seconda animazione (spostamento immagine)
          tl.to(
            image,
            {
              duration: 1.0,
              x: pX,
              width: widthImage + "px",
              height: heightImage + "px",
              boxShadow: "20px 15px 30px rgba(0,0,0,0.5)",
              ease: "power2.inOut",
              onComplete: () => {
                containerText!.style.visibility = "visible";
              },
            },
            "+=0.5"
          );

          // Configurazione e animazione del testo
          gsap.set(containerText, { x: "-12vw", y: pTY, opacity: 0 });
          tl.to(containerText, {
            opacity: 1,
            x: pTX,
            duration: 1.5,
            onComplete: () => {
              setIsComplete(true);
            },
          });

          tl.to(title, {
            x: tTX - 50,
          });
        }
      );
    }
  };

  const PlayAnimationText = () => {
    var mm = gsap.matchMedia();

    let p = ParagraphRef.current;

    if (p) {
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

          // Imposta le dimensioni in base alla media query

          let width = "70%";
          let pX = "-8vw";
          let pY = "0vh";

          if (isTablet) {
            width = "70%";
            pX = "-5vw";
            pY = "0vh";
          }
          if (isMobile) {
            width = "80%";
            p.style.textAlign = "center";
            pX = "-17vw";
            pY = "30vh";
          }

          p.style.width = width;

          gsap.set(p, { opacity: 0, x: pX, y: pY });
          gsap.to(p, {
            duration: 2,
            opacity: 1,
            text: {
              value:
                "Miglioramento della velocità e delle prestazioni del sito web per garantire un'esperienza utente fluida e piacevole.",
              newClass: "class2",
              delimiter: "",
            },
            onComplete: () => {
              dispatch(
                addAnimation({
                  isComplete: true,
                  nameAnimation: "AnPerformance",
                })
              );
            },
          });
        }
      );
    }
  };

  return (
    <>
      <ContainerDiv ref={containerDivRef}>
        <ContainerImg ref={ImageDiv}>
          <Image ref={ImageEl} src="/Layout/performance.png" />
        </ContainerImg>
        <ContainerText ref={ContainerTextRef}>
          <Title ref={TitleRef}>Ottimizzazione delle Performance</Title>
          <Description ref={ParagraphRef}></Description>
        </ContainerText>
      </ContainerDiv>
    </>
  );
};

export default HeroSectionPerformance;
