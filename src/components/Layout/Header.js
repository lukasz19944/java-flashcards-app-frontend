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

    const allFlashcardsHeaderLink = (
      <li className="nav-item">
        <Link to="/flashcards" className="nav-link">
          Wszystkie pytania
        </Link>
      </li>
    );

    const proposedFlashcardsHeaderLink = (
      <li className="nav-item">
        <Link to="/proposedFlashcards" className="nav-link">
          Propozycje pytań
        </Link>
      </li>
    );

    const progressHeaderLink = (
      <li className="nav-item">
        <Link to="/progress" className="nav-link">
          Postęp
        </Link>
      </li>
    );

    const ticketsHeaderLink = (
      <li className="nav-item">
        <Link to="/tickets" className="nav-link">
          Zgłoszenia
        </Link>
      </li>
    );

    const randomTestHeaderLink = (
      <li className="nav-item mr-3" style={{ marginTop: "4.5px" }}>
        <Link
          to="/random"
          className="btn btn-sm btn-outline-dark font-weight-bold"
        >
          LOSOWY TEST
        </Link>
      </li>
    );

    const addFlashcardHeaderLink = (
      <li className="nav-item mr-3" style={{ marginTop: "4.5px" }}>
        <Link
          to="/addFlashcard"
          className="btn btn-sm btn-outline-dark font-weight-bold"
        >
          DODAJ
        </Link>
      </li>
    );

    const proposeFlashcardHeaderLink = (
      <li className="nav-item mr-3" style={{ marginTop: "4.5px" }}>
        <Link
          to="/proposeFlashcard"
          className="btn btn-sm btn-outline-dark font-weight-bold"
        >
          ZAPROPONUJ
        </Link>
      </li>
    );

    const logoutHeaderLink = (
      <li className="nav-item">
        <Link to="/" className="nav-link" onClick={this.logout.bind(this)}>
          Wyloguj
        </Link>
      </li>
    );

    const registerHeaderLink = (
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Zarejestruj
        </Link>
      </li>
    );

    const loginHeaderLink = (
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Zaloguj
        </Link>
      </li>
    );

    const userIsAuthenticated = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">{progressHeaderLink}</ul>
        <ul className="navbar-nav ml-auto">
          {randomTestHeaderLink}
          {proposeFlashcardHeaderLink}
          {logoutHeaderLink}
        </ul>
      </div>
    );

    const userIsNotAuthenticated = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          {registerHeaderLink}
          {loginHeaderLink}
        </ul>
      </div>
    );

    const userIsAdmin = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          {allFlashcardsHeaderLink}
          {proposedFlashcardsHeaderLink}
          {progressHeaderLink}
          {ticketsHeaderLink}
        </ul>
        <ul className="navbar-nav ml-auto">
          {randomTestHeaderLink}
          {addFlashcardHeaderLink}
          {logoutHeaderLink}
        </ul>
      </div>
    );

    let headerLinks;

    if (valid_token && user && user.authority) {
      if (user.authority.includes("ROLE_ADMIN")) {
        headerLinks = userIsAdmin;
      } else {
        headerLinks = userIsAuthenticated;
      }
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
