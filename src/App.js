import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import HomePage from "./components/Layout/HomePage";
import store from "./store";
import AllFlashcards from "./components/Flashcards/AllFlashcards";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/all" component={AllFlashcards} />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
