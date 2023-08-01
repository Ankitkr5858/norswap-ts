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
    align-items: center;
    width: 48.50%;
    gap: 20px;
    padding: 15px 0;
    border-radius: 64px 6px 6px 64px;
background: linear-gradient(180deg, #2F2F2F 0%, #191919 100%);
box-shadow: 2.163542587612006e-15px 35.33333206176758px 70.66666412353516px 0px rgba(7, 7, 7, 0.56), 1.1058107241237905e-15px 18.05925941467285px 18.05925941467285px 0px #323232 inset, -1.1058107241237905e-15px -18.05925941467285px 18.05925941467285px 0px #151515 inset;
  }
  .inputFieldWrapper #swap-currency-output{
    border-radius: 6px 64px 64px 6px;
    padding: 15px 20px;
  }
 
  .inputFieldWrapper #swap-currency-input button{
    padding: 0;
  }
  .inputFieldWrapper #swap-currency-input button svg{
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
  .hZBHoY {
      margin-top: 0px !important;
  }
  .ctDzMu{
    font-size:20px;
  }
  .hXnmMB{
    display: block;
  }
  .inputFieldWrapper #swap-currency-input, .inputFieldWrapper #swap-currency-output{
    
    width: 100%;
    border-radius: 60px;
  }  
  .fgsQwt{
    left:40%;
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
