import React, { Component } from "react";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { userEmail: "", userName: "", userPassword: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
    if (this.state.userPassword != this.state.userPasswordConfirmation) {
      alert("senhas diferentes");
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          E-mail:
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
