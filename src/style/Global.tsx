// @ts-nocheck
// @ts-nocheck
import { createGlobalStyle } from "styled-components";
import { PancakeTheme } from "@nswap/uikit";

declare module "styled-components" {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme { }
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit',sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
  .inputFieldWrapper #swap-currency-input , .inputFieldWrapper #swap-currency-output{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 20px;
    padding: 18px 30px 15px 30px;
    margin-top: 24px;
    /* border-radius: 64px 64px 64px 64px; */
    border-radius: 24px;
background: linear-gradient(180deg, #2F2F2F 0%, #191919 100%);
box-shadow: 2.163542587612006e-15px 35.33333206176758px 70.66666412353516px 0px rgba(7, 7, 7, 0.56), 1.1058107241237905e-15px 18.05925941467285px 18.05925941467285px 0px #323232 inset, -1.1058107241237905e-15px -18.05925941467285px 18.05925941467285px 0px #151515 inset;
  }
 
  .inputFieldWrapper #swap-currency-output{
    /* border-radius: 64px 64px 64px 64px; */
    margin-top: 0;
    border-radius: 24px;
    padding: 18px 30px 15px 30px;
  }
 
  .inputFieldWrapper #swap-currency-input button{
    padding: 0;
  }
  .inputFieldWrapper #swap-currency-input button svg{
   flex: 0 0 auto;
  }

   #swap-currency-output-with-logo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    gap: 20px;
    padding: 18px 30px 15px 30px;
    margin-top: 24px;
    /* border-radius: 64px 64px 64px 64px; */
    border-radius: 24px;
background: linear-gradient(180deg, #2F2F2F 0%, #191919 100%);
box-shadow: 2.163542587612006e-15px 35.33333206176758px 70.66666412353516px 0px rgba(7, 7, 7, 0.56), 1.1058107241237905e-15px 18.05925941467285px 18.05925941467285px 0px #323232 inset, -1.1058107241237905e-15px -18.05925941467285px 18.05925941467285px 0px #151515 inset;
  }
  .nrkConverted{
    margin-bottom: 10px;
    font-size: 22px;
  }
  .flexAuto{
    flex: 0 0 auto;
  }

 .selectorWrapper{
  border-radius: 130.605px;
background: #121212;
color: #fff;
padding: 4px 24px;

 }
 .inputFieldWrapper * * input{
   color: #fff !important;
 }
 

 @media screen and (max-width: 425px){
  #homepage-hero {
      margin-top: 0px !important;
  }
  .hero-title-one {
    font-size: 17px !important;
  }
  .hero-title-two {
    font-size: 17px !important;
  }
  .inputFieldWrapper{
    display: block !important;
  }

  .inputFieldWrapper #swap-currency-input, .inputFieldWrapper #swap-currency-output{
    
    width: 100%;
    border-radius: 60px;
  }  
  
  #homepage-home5{
    margin-top: 0px !important;
  }

  video.video-tag {
    width: 100vw;
    height: 120vh;
    object-fit: cover;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
}

 } 
`;

export default GlobalStyle;
