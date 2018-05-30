import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: "",
      userName: "",
      userPassword: "",
      userPasswordConfirmation: "",
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
    if (this.state.userPassword !== this.state.userPasswordConfirmation) {
      alert("senhas diferentes");
    } else {
      this.postSignup();
    }
  }

  async postSignup() {
    console.log("posting to /api/signup");
    const signupResponse = await axios.post("/api/signup", {
      userName: this.state.userName,
      userEmail: this.state.userEmail,
      userPassword: this.state.userPassword,
      userPasswordConfirmation: this.state.userPasswordConfirmation
    });
    console.log("Server response:", signupResponse);
    this.setState({ redirectToHome: true });

    /*
    axios
      .post("/api/signup", {
        userName: this.state.userName,
        userEmail: this.state.userEmail,
        userPassword: this.state.userPassword,
        userPasswordConfirmation: this.state.userPasswordConfirmation
      })
      .then(function(response) {
        console.log("fim do post axios sem erro");
        // this.props.history.push("/");
        // this.setState({ redirectToHome: true });
      })
      .catch(function(error) {
        console.log("catch do post axios com erro");
        console.log(error);
      });*/
  }

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/" />;
    }

    return (
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
          Nome:
          <input
            name="userName"
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
        <label>
          Confirme sua senha:
          <input
            name="userPasswordConfirmation"
            type="password"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Signup;
