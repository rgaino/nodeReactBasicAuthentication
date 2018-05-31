import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div>
        <Link to="/signup">Criar conta</Link>
        <Link to="/signin">Entrar</Link>
      </div>
    );
  }
}

export default Header;
