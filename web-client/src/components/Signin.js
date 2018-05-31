import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: "",
      userName: "",
      userPassword: "",
      redirectToHome: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.postSignup();
  }

  postSignup() {
    axios
      .post("/api/signin", {
        userEmail: this.state.userEmail,
        userPassword: this.state.userPassword
      })
      .then(response => {
        toast.success("👍 " + response.data.success_message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          draggablePercent: 60
        });
        this.setState({ redirectToHome: true });
      })
      .catch(error => {
        toast.error("⚠️ " + error.response.data.error_message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          draggablePercent: 60
        });
      });
  }

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <ToastContainer />
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input
              name="userEmail"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Senha:
            <input
              name="userPassword"
              type="password"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Signin;