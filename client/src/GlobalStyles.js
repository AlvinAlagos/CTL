import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

//font imports
  @import url('https://fonts.googleapis.com/css2?family=Lato&family=Roboto&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');


  body {
    font-family: 'Lato', sans-serif;
  }


  h1, h2, h3 {
    font-family: 'Lato', sans-serif;
    font-family: 'Roboto', sans-serif;
  }

  html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
    }
    button,  input[type="reset"] {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }

    .root{
        min-height:100%;
    }
`;

export default GlobalStyles;