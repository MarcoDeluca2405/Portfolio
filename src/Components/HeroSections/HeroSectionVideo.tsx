import { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PlayIcon from "../PlayIcon/PlayIcon";
import PuasaIcon from "../PausaIcon/PausaIcon";
import { current } from "@reduxjs/toolkit";
import gsap from "gsap";

const DivContainer = styled.div`
  width: 90%;
  height: 500px;
  /* background-color: red; */
  margin-top: 300px;
  margin-bottom: 200px;
  position: relative;
  display: flex;
  justify-content: center;
`;

const DivVideo = styled.div`
  width: auto;
  height: auto;
  /* background-color: green; */
  position: absolute;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  top: 0px;
  display: flex;
  justify-content: center;
`;

const DivSprite = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const Sprite = styled(PlayIcon)<{ invertGradient: boolean }>`
  width: ${(props) => (props.invertGradient ? "220px" : "200px")};
  height: ${(props) => (props.invertGradient ? "220px" : "200px")};
  cursor: pointer;
  fill: ${(props) =>
    props.invertGradient
      ? "url(#invertedGradient)" // Utilizzare il gradiente invertito
      : "url(#normalGradient)"};
  transition: all 0.5s ease-in-out;

  @media (max-width: 1200px) {
    width: ${(props) => (props.invertGradient ? "180px" : "160px")};
    height: ${(props) => (props.invertGradient ? "180px" : "160px")};
  }

  @media (max-width: 768px) {
    width: ${(props) => (props.invertGradient ? "150px" : "130px")};
    height: ${(props) => (props.invertGradient ? "150px" : "130px")};
  }

  @media (max-width: 480px) {
    width: ${(props) => (props.invertGradient ? "100px" : "70px")};
    height: ${(props) => (props.invertGradient ? "100px" : "70px")};
  }
`;

const SpritePausa = styled(PuasaIcon)<{ invertGradient: boolean }>`
  width: ${(props) => (props.invertGradient ? "220px" : "200px")};
  height: ${(props) => (props.invertGradient ? "220px" : "200px")};
  cursor: pointer;
  fill: ${(props) =>
    props.invertGradient
      ? "url(#invertedGradient)" // Utilizzare il gradiente invertito
      : "url(#normalGradient)"};
  transition: all 0.5s ease-in-out;
`;

const DivPlayer = styled.div<{ isHover: boolean }>`
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 2;
  height: 30px;
  display: flex;
  align-items: center;
  opacity: ${(props) => (props.isHover ? 1 : 0)};

  transition: all 0.5s ease-in-out;
`;

const DivIcon = styled.div`
  width: 5%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconPlayer = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.45s ease-in-out;
  &:hover {
    opacity: 1;
    width: 30px;
  }
`;

const DivScrollTime = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const ScrollTime = styled.input.attrs({ type: "range" })`
  -webkit-appearance: none;
  width: 99%;
  height: 15px;
  background: ${(props) => {
    const max: number = !isNaN(parseFloat(props.max as string))
      ? parseFloat(props.max as string)
      : 100;
    const valuePercentage = ((props.value! as number) / max) * 100; // Calculate percentage based on max
    return `linear-gradient(to right, #535252 ${valuePercentage}%, rgba(0, 0, 0, 0.5) ${valuePercentage}%)`;
  }};
  border-radius: 15px;
  outline: none;
  opacity: 0.8;
  transition: opacity 0.2s ease-in-out, background 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #cfcdcd;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
  }

  &::-webkit-slider-thumb:hover {
    background: #8b8b8b;
  }

  &::-moz-range-thumb {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #cfcdcd;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
  }

  &::-moz-range-thumb:hover {
    background: #8b8b8b;
  }

  &::-ms-thumb {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #cfcdcd;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
  }

  &::-ms-thumb:hover {
    background: #8b8b8b;
  }
`;

const DivAudio = styled.div`
  width: 5%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;
const ImageAudio = styled.img<{ isPressAudio: boolean }>`
  width: 100%; /* Default width */
  height: 100%;
  object-fit: contain;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.45s ease-in-out;

  &:hover {
    opacity: 1;
    width: 25px; /* Grow on hover */
  }

  ${({ isPressAudio }: { isPressAudio: boolean }) =>
    isPressAudio &&
    `
    width: 20px;
    opacity: 1;
  `}
`;

const DivScrollAudio = styled.div`
  width: 100px;
  height: 20%;
  position: absolute;
  top: -55px;
  transform: rotate(-90deg);
  display: flex;
  align-items: center;
`;

const ScrollAudio = styled.input.attrs({ type: "range" })`
  -webkit-appearance: none;
  width: 100px;
  height: 20%;

  background: ${(props) =>
    `linear-gradient(to right, #0652a8 ${
      (props.value! as number) * 100
    }%, #cfcdcd ${(props.value! as number) * 100}%)`};
  border-radius: 10px;
  outline: none;
  opacity: 0.8;
  transition: opacity 0.2s ease-in-out, background 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-runnable-track {
    height: 8px;
    background: ${(props) =>
      `linear-gradient(to right, #0652a8 ${
        (props.value! as number) * 100
      }%, #cfcdcd ${(props.value! as number) * 100}%)`};
    border-radius: 10px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #cfcdcd;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
  }

  &::-webkit-slider-thumb:hover {
    background: #8b8b8b;
  }

  &::-moz-range-thumb {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #cfcdcd;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
  }

  &::-moz-range-thumb:hover {
    background: #8b8b8b;
  }

  &::-ms-thumb {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #cdcecf;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
  }

  &::-ms-thumb:hover {
    background: #8b8b8b;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* object-position: 0px; */
  border-radius: 20px;
  filter: contrast(1.2);
`;

const HeroSectionVideo = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerDivRef = useRef<HTMLDivElement | null>(null);

  const [invertGradient, setInvertGradient] = useState(false); // Stato per invertire il gradiente
  const [isPress, setIsPress] = useState(false);
  const [isPressPausa, setIsPressPausa] = useState(false);

  const [isPlayed, setIsPlayed] = useState(true);

  const [isHover, setIsHover] = useState(false);

  const [valueAudio, setValueAudio] = useState<number>(0.5);
  const [isPressAudio, setIsPressAudio] = useState<boolean>(false);

  const [valueVideo, setValueVideo] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);

  const handleChangeAudio = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setValueAudio(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleChangeVideo = (e: ChangeEvent<HTMLInputElement>) => {
    const newVideo = parseFloat(e.target.value);
    setValueVideo(newVideo);
    if (videoRef.current) {
      videoRef.current.currentTime = newVideo;
    }
  };

  const handleChangeVideoCurrent = (value: number) => {
    setValueVideo(value);
  };

  const handleMouseEnter = () => {
    setInvertGradient(true);
  };

  const handleMouseLeave = () => {
    setInvertGradient(false);
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play(); // Avvia il video
      } else {
        videoRef.current.pause(); // Mette in pausa il video
      }
    }
  };

  const handleChangePlayed = () => {
    const isPausa = !isPlayed;
    setIsPlayed(isPausa);

    if (!isPausa && videoRef.current) {
      videoRef.current.pause();
    } else {
      videoRef.current?.play();
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      const updateVideoTime = () => {
        setValueVideo(videoRef.current!.currentTime);
      };

      if (containerDivRef.current) {
        PlayAnimation();
      }

      const handleDurationChange = () => {
        if (videoRef.current) {
          setVideoDuration(videoRef.current.duration);
        }
      };

      videoRef.current.addEventListener("timeupdate", updateVideoTime);
      videoRef.current.addEventListener("durationchange", handleDurationChange);

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener("timeupdate", updateVideoTime);
          videoRef.current.removeEventListener(
            "durationchange",
            handleDurationChange
          );
        }
      };
    }
  }, []);

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
    }
  };

  return (
    <>
      <DivContainer ref={containerDivRef}>
        <DivVideo
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}>
          <Video
            ref={videoRef}
            src="/Video/CameraFilter.mp4"
            onMouseEnter={() => setIsPressPausa(true)}
            onDurationChange={(e) =>
              handleChangeVideoCurrent(e.currentTarget.currentTime)
            }
          />
          <DivSprite>
            {!isPress ? (
              <Sprite
                invertGradient={invertGradient}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  setIsPress(true);
                  handleVideoClick();
                }}
              />
            ) : (
              <DivPlayer isHover={isHover}>
                <DivIcon>
                  <IconPlayer
                    src={`/Png/${isPlayed ? "pause.png" : "play.png"}`}
                    onClick={handleChangePlayed}
                  />
                </DivIcon>
                <DivScrollTime>
                  <ScrollTime
                    value={valueVideo}
                    onChange={(e) => handleChangeVideo(e)}
                    min={0}
                    max={videoDuration || 100}
                    step={0.01}
                  />
                </DivScrollTime>
                <DivAudio>
                  <ImageAudio
                    src="/Png/volume.png"
                    isPressAudio={isPressAudio}
                    onClick={() => setIsPressAudio(!isPressAudio)}
                  />
                  <DivScrollAudio
                    style={{ display: isPressAudio ? "flex" : "none" }}>
                    <ScrollAudio
                      value={valueAudio}
                      onChange={(e) => handleChangeAudio(e)}
                      min={0}
                      max={1}
                      step={0.01}
                    />
                  </DivScrollAudio>
                </DivAudio>
              </DivPlayer>
            )}
          </DivSprite>
        </DivVideo>
      </DivContainer>
    </>
  );
};

export default HeroSectionVideo;
