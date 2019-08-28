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
import UpdateFlashcard from "./components/Flashcards/UpdateFlashcard";
import RandomTest from "./components/Flashcards/RandomTest";
import ProgressComponent from "./components/Progress/ProgressComponent";

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
            path="/category/:category/:difficulty"
            component={FlashcardsByCategory}
          />
          <Route exact path="/addFlashcard" component={AddFlashcard} />
          <Route
            exact
            path="/updateFlashcard/:id"
            component={UpdateFlashcard}
          />
          <Route exact path="/random" component={RandomTest} />
          <Route exact path="/progress" component={ProgressComponent} />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
