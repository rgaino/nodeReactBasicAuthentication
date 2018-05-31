import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Landing from "./Landing";
import Signup from "./Signup";
import Signin from "./Signup";

class App extends Component {
  render() {
    return (
      <div>
        {" "}
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
