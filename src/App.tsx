import { useEffect, useState } from "react";
import NavBar from "./Components/NavBar/NavBar";
import styled from "styled-components";
import { useAppSelector } from "./Components/Hooks/hooks";
import ScrollBanner from "./Components/ScrollBanner/ScrollBanner";
import HeroSectionMain from "./Components/HeroSections/HeroSectionMain";
import HeroSectionThree from "./Components/HeroSections/HeroSectionThree";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";
import MyArticle from "./Components/Article/MyArticle";
import HeroSectionSviluppo from "./Components/HeroSections/HeroSectionSviluppo";
import HeroSectionAPI from "./Components/HeroSections/HeroSectionAPI";
import HeroSectionPerformance from "./Components/HeroSections/HeroSectionPerformance";
import HeroSectionConsulenza from "./Components/HeroSections/HeroSectionConsulenza";
import HeroSectionAlberatura from "./Components/HeroSections/HeroSectionAlberatura";
import HeroSectionVideo from "./Components/HeroSections/HeroSectionVideo";
import HeroSectionInfo from "./Components/HeroSections/HeroSectionInfo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import PrivacyPolicy from "./Components/Privacy/PrivacyPolicy";
import TermsOfService from "./Components/TermsOfService/TermsOfService";
import Contact from "./Components/Contact/Contact";
import About from "./Components/About/AboutMe";
import "./App.css";
import AboutMe from "./Components/About/AboutMe";

const DivCenter = styled.div<{ isVisible: boolean }>`
  width: 100%;
  height: 100%;
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

gsap.registerPlugin(ScrollTrigger, TextPlugin);

ScrollTrigger.defaults({
  scroller: document.body,
});

function App() {
  const state = useAppSelector((state) => state.myState);
  const [isVisible, setIsVisible] = useState(false);

  const [showConsulenza, setShowConsulenza] = useState(false);

  useEffect(() => {
    setIsVisible(state.isVisible);
  }, [state.isVisible]);

  useEffect(() => {
    if (
      state.Animation.some(
        (f) => f.nameAnimation === "AnPerformance" && f.isComplete
      )
    ) {
      const timeout = setTimeout(() => {
        setShowConsulenza(true);
      }, 500); // Ritardo di 500ms

      return () => clearTimeout(timeout); // Pulizia
    }
  }, [state.Animation]);

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <DivCenter isVisible={isVisible}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSectionMain />
                  <ScrollBanner />
                  <HeroSectionThree />
                  <MyArticle />
                  <HeroSectionSviluppo />
                  <HeroSectionAPI />
                  <HeroSectionPerformance />

                  {showConsulenza && (
                    <>
                      <HeroSectionConsulenza />
                      <HeroSectionAlberatura />
                      <HeroSectionVideo />
                      <HeroSectionInfo />
                      <Footer />
                    </>
                  )}
                </>
              }
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutMe />} />
          </Routes>
        </DivCenter>
      </BrowserRouter>
    </>
  );
}

export default App;
