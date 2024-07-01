import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { createGlobalStyle } from "styled-components";
import { THEME } from "../theme";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    font-family: 'Hind', sans-serif;
    font-weight: ${THEME.FONT_WEIGHT.MEDIUM};
    vertical-align: baseline;
    scroll-behavior: smooth !important;
  }

  html, body, #root {
    height: 100%;
    width: 100%;

    background-color: ${THEME.COLORS.BACKGROUND_200};
  }

  *::-webkit-scrollbar {
    -webkit-appearance: none;
}
  *::-webkit-scrollbar:vertical {
    width: 0.688rem;
}
  *::-webkit-scrollbar:horizontal {
    height: 0.688rem;
}
  *::-webkit-scrollbar-thumb {
    border-radius: 0.5rem;
    border: 2px solid white;
    background-color: rgba(0, 0, 0, .5);
}
  *::-webkit-scrollbar-track {
    background-color: #fff;
    border-radius: 8px;
}

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
      display: block;
  }
  body {
      line-height: 1;
  }
  ol, ul {
      list-style: none;
  }
  blockquote, q {
      quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  }
  table {
      border-collapse: collapse;
      border-spacing: 0;
  }
`;

// Matendo apenas até removermos o material-ui
const themeConfigs = createTheme({
  components: {
    // MuiCssBaseline: {
    //   styleOverrides: {
    //     "*": {
    //       margin: 0,
    //       padding: 0,
    //       border: 0,
    //       fontSize: "100%",
    //       font: "inherit",
    //       verticalAlign: "baseline"
    //     },
    //     "*::-webkit-scrollbar": {
    //       width: "0.8rem"
    //     },
    //     "*::-webkit-scrollbar-track": {
    //       backgroundColor: grey[400],
    //       borderRadius: 15
    //     },
    //     "*::-webkit-scrollbar-thumb": {
    //       backgroundColor: grey[600],
    //       borderRadius: 25,
    //     },
    //     "html, body, #root": {
    //       height: "100%",
    //       width: "100%",

    //       backgroundColor: "#F5F5F5",
    //     },
    //     "h1, h2, h3, h4, h5, p": {
    //       color: `${grey[800]} !important`,
    //     },
    //     "h1, h2, h3, h4, h5": {
    //       fontWeight: "700 !important"
    //     },
    //   },
    // },
    MuiGrid: {
      styleOverrides: {
        container: {
          width: "100%",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "10px",
        },
      },
    },
  },
});

export const theme = responsiveFontSizes(themeConfigs);
