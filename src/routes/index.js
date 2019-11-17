import React from "react";
import { Route, Switch } from "react-router-dom";

import { MainPage } from "pages";

const Routes = () => (
  <Switch>
    <Route exact={true} path="/" component={MainPage} />
  </Switch>
);

export default Routes;
