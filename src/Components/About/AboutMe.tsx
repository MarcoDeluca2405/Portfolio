import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
`;

const Header = styled.h1`
  font-size: 2rem;
  color: #0056b3;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  margin: 10px 0;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 20px 0;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SkillItem = styled.li`
  font-size: 1rem;
  margin: 5px 0;
  &:before {
    content: "✔️ ";
    color: #007bff;
    font-weight: bold;
  }
`;

const AboutMe: React.FC = () => {
  const skills = [
    "Java",
    "JavaScript",
    "PostgreSQL",
    "mySQL",
    "Postman",
    "HTML5",
    "CSS3",
    "Bootstrap",
    "React",
    "React Bootstrap",
    "React Router",
    "React Redux",
    "TypeScript",
    "JSON",
    "Node.js",
    "C#",
    ".NET",
    "ASP.NET",
    "Git",
    "Database",
    "Unreal Engine 5",
  ];

  return (
    <Container>
      <Header>Chi sono?</Header>
      <Paragraph>
        Mi chiamo Marco, sono uno sviluppatore appassionato di tecnologie con
        una missione: creare soluzioni straordinarie e garantire la massima
        soddisfazione del cliente. Ogni progetto è per me un'opportunità di
        crescere e offrire il meglio.
      </Paragraph>
      <Paragraph>
        Sono un perfezionista e mi impegno a fornire risultati che superino le
        aspettative. Con una vasta esperienza in numerosi linguaggi di
        programmazione e tecnologie, ho le competenze per affrontare qualsiasi
        sfida.
      </Paragraph>
      <Header>Le mie competenze</Header>
      <SkillsGrid>
        {skills.map((skill, index) => (
          <SkillItem key={index}>{skill}</SkillItem>
        ))}
      </SkillsGrid>
      <Paragraph>
        Che sia sviluppo front-end, back-end o gestione di database, sono pronto
        a fare la differenza. Lavoriamo insieme per costruire qualcosa di
        straordinario!
      </Paragraph>
    </Container>
  );
};

export default AboutMe;
