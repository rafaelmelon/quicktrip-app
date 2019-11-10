import React from "react";
import { Route, Switch } from "react-router-dom";

import { Home } from "pages";

const Routes = () => (
  <Switch>
    <Route exact={true} path="/" component={Home} />
  </Switch>
);

export default Routes;
