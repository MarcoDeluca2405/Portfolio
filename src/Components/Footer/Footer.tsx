import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"; // Assicurati di usare React Router per la navigazione interna
import { useAppDispatch } from "../Hooks/hooks";
import { setAnimation } from "../../Redux/States/stateSlice";

// Styled components per il Footer
const FooterContainer = styled.footer`
  width: 100%;
  padding: 40px 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  border-top: 1px solid #ddd;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 5px;

  h4 {
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
  }

  a {
    font-size: 14px;
    color: #007bff;
    text-decoration: none;
    margin-bottom: 5px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Copyright = styled.p`
  font-size: 14px;
  color: #6c757d;
  text-align: center;
  width: 100%;
  margin-top: 20px;
`;

// Componente Footer
const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <FooterContainer>
      <FooterSection>
        <h4>Link Utili</h4>
        <Link to="/privacy-policy" onClick={() => handleScrollToTop()}>
          Privacy Policy
        </Link>
        <Link to="/terms-of-service" onClick={() => handleScrollToTop()}>
          Termini di Servizio
        </Link>
        <Link to="/contact" onClick={() => handleScrollToTop()}>
          Contatti
        </Link>
      </FooterSection>

      <FooterSection>
        <h4>Servizi</h4>
        <Link to="/about" onClick={() => handleScrollToTop()}>
          Chi Sono
        </Link>
      </FooterSection>

      <Copyright>
        &copy; {new Date().getFullYear()} - Tutti i diritti riservati
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
