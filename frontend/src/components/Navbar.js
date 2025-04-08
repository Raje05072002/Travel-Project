// components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FiMenu, FiX } from 'react-icons/fi';

const NavbarContainer = styled.nav`
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 0;
  border-bottom: 1px solid #f0f0f0;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #4f46e5;
  text-decoration: none;

  span {
    color: #1f2937;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    background-color: #ffffff;
    flex-direction: column;
    align-items: center;
    gap: 0;
    padding: 0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    max-height: ${({ $isOpen }) => ($isOpen ? '500px' : '0')};
    overflow: hidden;
  }
`;

const NavItem = styled.li`
  a {
    color: #374151;
    font-weight: 500;
    padding: 0.5rem 0;
    position: relative;
    transition: all 0.2s ease;
    text-decoration: none;

    &:hover {
      color: #4f46e5;
    }

    &.active {
      color: #4f46e5;
      font-weight: 600;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #4f46e5;
      }
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;

    a {
      display: block;
      padding: 1rem;
      border-bottom: 1px solid #f0f0f0;

      &.active::after {
        display: none;
      }
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #1f2937;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', name: 'Home' },
    { path: '/prediction', name: 'Prediction' },
    { path: '/analytics', name: 'Analytics' },
    { path: '/trends', name: 'Trends' },
    { path: '/hotels', name: 'Hotels' },
    { path: '/chatbot', name: 'Chatbot' },
    { path: '/about', name: 'About' },
     // Optional: if you added the backend embed
  ];

  useEffect(() => {
    setMobileMenuOpen(false); // Close mobile menu on route change
  }, [location]);

  return (
    <NavbarContainer>
      <NavContent>
        <Logo to="/">
          Travel<span>AI</span>
        </Logo>

        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </MobileMenuButton>

        <NavLinks $isOpen={mobileMenuOpen}>
          {navItems.map((item) => (
            <NavItem key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                {item.name}
              </Link>
            </NavItem>
          ))}
        </NavLinks>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;