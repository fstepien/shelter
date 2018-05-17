import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Public from "./components/Public";
import Operations from "./components/Operations";
import Admin from "./components/Admin";
import NotFound from "./components/NotFound";

class App extends Component {
  state = {
    test: 123
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Public} />
          <Route exact path="/Admin" component={Admin} />
          <Route
            exact
            path="/Operations"
            component={Operations}
            state={this.state}
          />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
