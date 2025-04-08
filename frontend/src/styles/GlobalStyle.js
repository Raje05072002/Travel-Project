
import { createGlobalStyle } from 'styled-components';

const defaultheme = {
    colors: {
        primary: '#4F46E5',
        secondary: '#10B981',
        dark: '#1F2937',
        light: '#F9FAFB',
        text: '#374151',
        background: '#FFFFFF'
      },
      shadows: {
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      },
      breakpoints: {
        md: '768px'
      }
    };
    
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main-content {
    flex: 1;
    padding: 2rem 0;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: all 0.2s ease;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  @media (max-width: ${({ theme }) => theme?.breakpoints?.md || defaultheme.breakpoints.md}) {
    .main-content {
      padding: 1rem 0;
    }
  }
`;

export default GlobalStyle;