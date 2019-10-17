import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Layout/Header";
import HomePage from "./components/Layout/HomePage";
import store from "./store";
import AllFlashcards from "./components/Flashcards/AllFlashcards";
import FlashcardsByCategory from "./components/Flashcards/FlashcardsByCategory";
import AddFlashcard from "./components/Flashcards/AddFlashcard";
import UpdateFlashcard from "./components/Flashcards/UpdateFlashcard";
import RandomTest from "./components/Flashcards/RandomTest";
import ProgressComponent from "./components/Progress/ProgressComponent";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecuredRoute";
import Login from "./components/UserManagement/Login";
import Register from "./components/UserManagement/Register";
import RedirectToHomePage from "./components/Layout/RedirectToHomePage";
import ProposedFlashcards from "./components/Flashcards/ProposedFlashcards";

function App() {
  const jwtToken = localStorage.jwtToken;

  if (jwtToken) {
    setJWTToken(jwtToken);
    const decoded_jwt = jwt_decode(jwtToken);
    store.dispatch({
      type: SET_CURRENT_USER,
      payload: decoded_jwt
    });

    const current_time = Date.now() / 1000;
    if (decoded_jwt.exp < current_time) {
      store.dispatch(logout());

      window.location.href = "/";
    }
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />

            <SecuredRoute exact path="/" component={HomePage} />
            <SecuredRoute
              exact
              path="/flashcards"
              component={AllFlashcards}
              role="ROLE_ADMIN"
            />
            <SecuredRoute
              exact
              path="/proposedFlashcards"
              component={ProposedFlashcards}
              role="ROLE_ADMIN"
            />
            <SecuredRoute
              exact
              path="/category/:category/:difficulty"
              component={FlashcardsByCategory}
            />
            <SecuredRoute
              exact
              path="/addFlashcard"
              component={AddFlashcard}
              role="ROLE_ADMIN"
            />
            <SecuredRoute
              exact
              path="/proposeFlashcard"
              component={AddFlashcard}
            />
            <SecuredRoute
              exact
              path="/updateFlashcard/:id"
              component={UpdateFlashcard}
              role="ROLE_ADMIN"
            />
            <SecuredRoute exact path="/random" component={RandomTest} />
            <SecuredRoute
              exact
              path="/progress"
              component={ProgressComponent}
            />

            <Route path="/*" component={RedirectToHomePage}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
