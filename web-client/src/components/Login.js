import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: "",
      userPassword: ""
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
    this.postLogin();
  }

  postLogin() {
    axios
      .post("/api/login", {
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
        this.props.fetchUser();
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
        this.props.fetchUser();
      });
  }

  render() {
    return (
      <div>
        <div>
          <h1>Entrar</h1>
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
              <label>Senha: </label>
              <input
                name="userPassword"
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

export default connect(null, actions)(Login);
