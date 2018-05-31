import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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
    this.postSignup();
  }

  postSignup() {
    axios
      .post("/api/user", {
        userName: this.state.userName,
        userEmail: this.state.userEmail,
        userPassword: this.state.userPassword,
        userPasswordConfirmation: this.state.userPasswordConfirmation
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

        this.setState({
          redirectToHome: true //,
        });
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
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { success_message: this.state.success_message }
          }}
        />
      );
      // <Redirect to="/" state={ success_message: this.state.success_message }/>;
    }

    return (
      <div>
        <div>
          <h1>Crie uma conta</h1>
        </div>

        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Email:</label>
              <input
                name="userEmail"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label>Nome:</label>
              <input
                name="userName"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label>Senha: </label>
              <input
                name="userPassword"
                type="password"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label>Confirme sua senha: </label>
              <input
                name="userPasswordConfirmation"
                type="password"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
