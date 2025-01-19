import { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppDispatch } from "../Hooks/hooks";
import { setVisibleBanner } from "../../Redux/States/stateSlice";

const DivContainer = styled.div`
  width: 90%;
  height: 700px;
  margin-top: 350px;
  margin-bottom: 50px;
  /* background-color: red; */
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const DivStopElement = styled.div`
  width: 90%;
  height: 20px;
  /* background-color: green; */
`;

const HeroSectionAlberatura = () => {
  const ContainerDivRef = useRef<HTMLDivElement | null>(null);
  const StopDivRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const stopDiv = StopDivRef.current;

    if (stopDiv) {
      // Configura ScrollTrigger per cambiare lo stato in base allo scrolling
      ScrollTrigger.create({
        trigger: stopDiv,
        start: "top 80%",
        end: "top 30%",

        onEnter: () => {
          // Scorrimento verso il basso: setVisibleBanner(false)
          dispatch(setVisibleBanner(false));
        },
        onLeaveBack: () => {
          // Scorrimento verso l'alto: setVisibleBanner(true)
          dispatch(setVisibleBanner(true));
        },
        scrub: 0.6,
        toggleActions: "play none none none",
        once: false,
      });
    }

    PlayAnimation();

    // Cleanup quando il componente viene smontato
    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, [dispatch]);

  const PlayAnimation = () => {
    const div = ContainerDivRef.current;
    if (div) {
      gsap.fromTo(
        div,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2,
          scrollTrigger: {
            trigger: div,
            start: "top 80%",
            end: "top 30%",
            scrub: 0.6,

            toggleActions: "play none none none",
            once: false,
          },
        }
      );
    }
  };

  return (
    <>
      <DivStopElement ref={StopDivRef} />
      <DivContainer ref={ContainerDivRef}>
        <Image src="/Png/Skills.png" />
      </DivContainer>
    </>
  );
};

export default HeroSectionAlberatura;
