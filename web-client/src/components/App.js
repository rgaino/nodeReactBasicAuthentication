import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Header from "./Header";
import Landing from "./Landing";
import Signup from "./Signup";
import Signin from "./Signin";

class App extends Component {
  render() {
    return (
      <div>
        {" "}
        <BrowserRouter>
          <div>
            <Header />
            <div>
              <ToastContainer />
            </div>
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
