import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import emailjs from "emailjs-com";
import { Slide, toast, ToastContainer } from "react-toastify";
import gsap from "gsap";

const DivContainer = styled.div`
  width: 90%;
  height: auto;
  /* background-color: orange; */
  margin-bottom: 60px;
  margin-top: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DivTitle = styled.div`
  width: 100%;
  height: 20%;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  background: unset;
  -webkit-background-clip: unset;
  -webkit-text-fill-color: unset;
  background-clip: unset;
  color: #cecece;
  margin-bottom: 0;
  text-align: center;

  @media screen and (max-width: 767px) {
    font-size: 23px;
  }

  @media screen and (max-width: 350px) {
    font-size: 20px;
  }
`;

const Description = styled.p`
  margin: 0 auto;
  padding: 0;
  text-align: center;
  width: 100%;

  @media screen and (max-width: 767px) {
    font-size: 15px;
  }

  @media screen and (max-width: 350px) {
    font-size: 14px;
  }
`;

const DivIcon = styled.div`
  width: 100%;
  height: 20%;
  /* background-color: green; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 30px;
`;

const Icon = styled.img`
  width: 100px;
  height: 100px;
  opacity: 0.6;
  cursor: pointer;
  transition: all 0.45s ease-in-out;
  &:hover {
    width: 120px;
    height: 120px;
    opacity: 1;
  }

  @media screen and (max-width: 992px) {
    width: 80px;
    height: 80px;
    &:hover {
      width: 100px;
      height: 100px;
    }
  }

  @media screen and (max-width: 768px) {
    width: 60px;
    height: 60px;
    &:hover {
      width: 80px;
      height: 80px;
    }
  }
`;

const DivEmail = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 767px) {
    justify-content: center;
    align-items: center;
  }
  /* background-color: grey; */
`;

const FormEmail = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 60px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.35s ease-in-out;

  &:hover,
  &:has(input:focus, textarea:focus) {
    width: calc(50% + 1%);
    box-shadow: 0 0px 30px rgba(1, 149, 248, 0.644);
  }

  @media screen and (max-width: 992px) {
    width: 80%;
    &:hover,
    &:has(input:focus, textarea:focus) {
      width: calc(80% + 1%);
      box-shadow: 0 0px 30px rgba(1, 149, 248, 0.644);
    }
  }

  @media screen and (max-width: 767px) {
    width: 75%;

    &:hover,
    &:has(input:focus, textarea:focus) {
      width: calc(75% + 1%);
      box-shadow: 0 0px 30px rgba(1, 149, 248, 0.644);
    }
  }

  label {
    all: unset;
    color: #d3cccc;
    margin-bottom: 10px;
    font-weight: bold;
  }

  input,
  textarea {
    margin-bottom: 15px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    color: #c3bec5;
    border-radius: 5px;
    background-color: transparent;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #0453ffc0;
    color: #fff;
    border: none;
    border-radius: 5px;
    transition: all 0.45s ease-in-out;
    cursor: pointer;
    &:disabled {
      background: transparent;
      border: #474849 1px solid;
    }

    &:not(:disabled):hover {
      background-color: #1a08bdd2;
    }
  }
`;

const DivCV = styled.div`
  width: 200px;
  height: 70px;
  justify-self: end;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;

  @media screen and (max-width: 767px) {
    margin: 0 auto;
    padding: 0 auto;
    position: relative;
    top: -20px;
  }

  button {
    width: 90%;
    height: 80%;
    border-radius: 20px;
    border: 1px solid grey;
    background-color: transparent;
    color: #b6b6b6;
    transition: all 0.35s ease-in-out;
    &:hover {
      width: 95%;
      height: 85%;
      font-size: 17px;
      box-shadow: 0 0 20px #bd14a6, inset 0 0 20px #bd14a6;
      background-color: rgba(185, 47, 185, 0.658);
      color: white;
    }

    @media screen and (max-width: 767px) {
      width: 80%;
      height: 70%;
      font-size: 12px;

      &:hover {
        width: 85%;
        height: 80%;
        font-size: 13px;
        box-shadow: 0 0 20px #bd14a6, inset 0 0 20px #bd14a6;
        background-color: rgba(185, 47, 185, 0.658);
        color: white;
      }
    }
  }
`;

const HeroSectionInfo = () => {
  const DivRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = useState({
    sender: "",
    subject: "",
    body: "",
  });

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    validateForm({ ...formData, [name]: value });
  };

  const validateForm = (updatedFormData: typeof formData) => {
    const isValidEmail = validateEmail(updatedFormData.sender);
    const isComplete =
      !!updatedFormData.sender &&
      !!updatedFormData.subject &&
      !!updatedFormData.body;
    setIsEmailValid(isValidEmail);
    setIsFormComplete(isComplete);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);

    emailjs
      .send(
        "service_52mwlhq", // Sostituisci con il tuo Service ID
        "template_4awwtg4", // Sostituisci con il tuo Template ID
        {
          from_name: formData.sender,
          to_name: formData.subject,
          message: formData.body,
        },
        "xDQuDP7hSywsR_B9p" // Sostituisci con la tua Public Key
      )
      .then(
        (response) => {
          notify({ message: "Email inviata con successo!", error: false });
          console.log("SUCCESS!", response.status, response.text);
        },
        (error) => {
          console.error("Errore durante l'invio dell'email:", error);
          notify({
            message: "Errore durante l'invio dell'email.",
            error: true,
          });
        }
      );
  };

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = "/public/CV/CV Marco De luca 2024.pdf";
    link.download = "Marco_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const notify = ({ message, error }: { message: string; error: boolean }) =>
    error
      ? toast.error(message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: 1,
          theme: "dark",
          transition: Slide,
        })
      : toast.success(message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: 1,
          theme: "dark",
          transition: Slide,
        });

  const PlayAnimation = () => {
    if (DivRef.current) {
      gsap.fromTo(
        DivRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2,
          scrollTrigger: {
            trigger: DivRef.current,
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

  useEffect(() => {
    if (DivRef.current) {
      PlayAnimation();
    }
  }, []);

  return (
    <>
      <DivContainer ref={DivRef}>
        <DivTitle>
          <Title>Vuoi sapere di più su di me?</Title>
          <Description>
            Seguimi sui miei social per rimanere aggiornato sui miei progetti e
            novità!
          </Description>
        </DivTitle>
        <DivIcon>
          <Icon
            src="/Png/Github.png"
            onClick={() =>
              window.open(
                "https://github.com/MarcoDeluca2405?tab=repositories",
                "_blank",
                "noopener,noreferrer"
              )
            }
          />
          <Icon
            src="/Png/instagram.png"
            onClick={() =>
              window.open(
                "https://www.instagram.com/ildelux96/",
                "_blank",
                "noopener,noreferrer"
              )
            }
          />
          <Icon
            src="/Png/facebook.png"
            onClick={() =>
              window.open(
                "https://www.facebook.com/profile.php?id=100085154469773",
                "_blank",
                "noopener,noreferrer"
              )
            }
          />
          <Icon
            src="/Png/LinkedIn.png"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/ildelux1996/",
                "_blank",
                "noopener,noreferrer"
              )
            }
          />
        </DivIcon>
        <DivEmail>
          <FormEmail onSubmit={handleSubmit}>
            <label htmlFor="sender">Mittente:</label>
            <input
              type="email"
              id="sender"
              name="sender"
              placeholder="Es. Example@example.it"
              value={formData.sender}
              onChange={handleChange}
              required
            />
            {!isEmailValid && formData.sender && (
              <small style={{ color: "red" }}>Inserisci un'email valida</small>
            )}
            <label htmlFor="subject">Oggetto:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <label htmlFor="body">Corpo:</label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              rows={5}
              placeholder="Scrivi qualcosa..."
              required></textarea>

            <button type="submit" disabled={!isEmailValid || !isFormComplete}>
              Invia Email
            </button>
          </FormEmail>
          <DivCV>
            <button onClick={downloadCV}>Scarica il mio CV</button>
          </DivCV>
        </DivEmail>
      </DivContainer>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </>
  );
};

export default HeroSectionInfo;
