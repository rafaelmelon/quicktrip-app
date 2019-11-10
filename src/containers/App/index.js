import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { GlobalStyles, theme } from "theme";
import Routes from "routes";
import { configureStore } from "redux/store";

const { store } = configureStore();

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Router>
          <Routes />
        </Router>
      </>
    </ThemeProvider>
  </Provider>
);

export default App;
