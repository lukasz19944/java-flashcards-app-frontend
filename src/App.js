import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import HomePage from "./components/Layout/HomePage";
import store from "./store";
import AllFlashcards from "./components/Flashcards/AllFlashcards";
import FlashcardsByCategory from "./components/Flashcards/FlashcardsByCategory";
import AddFlashcard from "./components/Flashcards/AddFlashcard";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/all" component={AllFlashcards} />
          <Route
            exact
            path="/category/:category"
            component={FlashcardsByCategory}
          />
          <Route exact path="/addFlashcard" component={AddFlashcard} />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
