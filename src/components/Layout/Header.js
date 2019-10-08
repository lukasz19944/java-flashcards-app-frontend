import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";

class Header extends Component {
  logout() {
    this.props.logout();
    window.location.href = "/";
  }

  render() {
    const { valid_token, user } = this.props.security;

    const userIsAuthenticated = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/flashcards" className="nav-link">
              Wszystkie pytania
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/progress" className="nav-link">
              Postęp
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-3" style={{ marginTop: "4.5px" }}>
            <Link
              to="/random"
              className="btn btn-sm btn-outline-dark font-weight-bold"
            >
              LOSOWY TEST
            </Link>
          </li>
          <li className="nav-item mr-3" style={{ marginTop: "4.5px" }}>
            <Link
              to="/addFlashcard"
              className="btn btn-sm btn-outline-dark font-weight-bold"
            >
              DODAJ
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={this.logout.bind(this)}>
              Wyloguj
            </Link>
          </li>
        </ul>
      </div>
    );

    const userIsNotAuthenticated = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/register" className="nav-link">
              Zarejestruj
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Zaloguj
            </Link>
          </li>
        </ul>
      </div>
    );

    let headerLinks;

    if (valid_token && user) {
      headerLinks = userIsAuthenticated;
    } else {
      headerLinks = userIsNotAuthenticated;
    }

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Java Interview Questions
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {headerLinks}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  security: state.security
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
