import { createGlobalStyle } from 'styled-components';

import PopinsRegular from '../assets/fonts/Poppins-Regular.ttf';
import PopinsMedium from '../assets/fonts/Poppins-Medium.ttf';
import PopinsBold from '../assets/fonts/Poppins-Bold.ttf';


export const GlobalStyles = createGlobalStyle`

  @font-face {
    font-family: 'Poppins';
    font-weight: 400;
    src: url('${PopinsRegular}') format('truetype');
  }

  @font-face {
    font-family: 'Poppins';
    font-weight: 500;
    src: url('${PopinsMedium}') format('truetype');
  }

  @font-face {
    font-family: 'Poppins';
    font-weight: 700;
    src: url('${PopinsBold}') format('truetype');
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: PoppinsRegular, sans-serif;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${props => props.theme['light-gray']};
  }

  body {
    background: ${props => props.theme['smoke']};
    -webkit-font-smoothing: antialiased;

  }



  // font-size: 16px (Desktop)
  html {
    @media (max-width: 1080px) {
      font-size: 93.75%; //15px
    }

    @media (max-width: 720px) {
      font-size: 87.5%; //14px
    }
  }

  button {
    cursor: pointer;
    font-size: 1rem;
    color: #333;
  }
`;
