import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../actions";

class Header extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    axios
      .get("/api/logout")
      .then(response => {
        this.props.fetchUser();
      })
      .catch(error => {
        console.log("error", error);
        this.props.fetchUser();
      });
  }

  renderHeaderMenu() {
    switch (this.props.authentication) {
      case null:
        return;
      case false:
        return [
          <Link key="signup" to="/signup">
            Criar conta
          </Link>,
          <Link key="login" to="/login">
            Entrar
          </Link>
        ];
      default:
        return [
          <Link key="profile" to="/profile">
            {this.props.authentication.name}
          </Link>,
          <Link to="/" key="logout" onClick={this.logout}>
            Sair
          </Link>
        ];
    }
  }

  render() {
    return <div>{this.renderHeaderMenu()}</div>;
  }
}

function mapStateToProps({ authentication }) {
  return { authentication };
}
export default connect(mapStateToProps, actions)(Header);
