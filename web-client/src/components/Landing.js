import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

class Landing extends Component {
  componentDidMount() {
    if (
      this.props.location.state &&
      this.props.location.state.success_message
    ) {
      toast.success("👍 " + this.props.location.state.success_message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        draggablePercent: 60
      });
      this.props.location.setState({ success_message: null });

      // this.props.location.state.success_message = null;
      // browserHistory.replace({
      //   pathname: "/",
      //   state: {}
      // });
    }
  }

  render() {
    return (
      <div>
        <div>
          <ToastContainer />
        </div>
        <div>
          <h1>Landing page</h1>
        </div>
      </div>
    );
  }
}

export default Landing;
