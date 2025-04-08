
import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #1e293b;
  color: #e2e8f0;
  padding: 3rem 0;
  margin-top: auto;
  border-top: 1px solid #334155;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between; /* Distribute sections horizontally */
  align-items: center; /* Vertically align items */
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
`;

const LeftSection = styled.div`
  flex: 1;
  min-width: 300px;
  margin-bottom: 1.5rem;

  h3 {
    color: #64748b;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  p {
    color: #cbd5e1;
    margin-bottom: 1rem;
  }
`;

const RightSection = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    color: #cbd5e1;
    font-size: 1.5rem;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #64748b;
    }
  }
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    color: #cbd5e1;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #64748b;
    }
  }
`;

const Copyright = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid #334155;
  color: #64748b;
  font-size: 0.8rem;
  width: 100%;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LeftSection>
          <h3>TravelAI</h3>
          <p>Your intelligent travel companion for predictions, analytics, and personalized recommendations.</p>
        </LeftSection>

        <RightSection>
          <SocialLinks>
            <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </SocialLinks>
          <LegalLinks>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/contact">Contact Us</Link>
          </LegalLinks>
        </RightSection>
      </FooterContent>
      <Copyright>
        © {new Date().getFullYear()} Travel AI Project. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;