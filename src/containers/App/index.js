import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { GlobalStyles, theme } from "theme";
import Routes from "routes";

const App = () => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <GlobalStyles />
      <Router>
        <Routes />
      </Router>
    </React.Fragment>
  </ThemeProvider>
);

export default App;
