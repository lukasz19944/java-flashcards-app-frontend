import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class RedirectToHomePage extends Component {
  render() {
    return (
      <div>
        <Redirect to="/"></Redirect>
      </div>
    );
  }
}

export default RedirectToHomePage;
