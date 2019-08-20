import React, { Component } from "react";
import { connect } from "react-redux";
import { getFlashcardsByCategory } from "../../actions/flashcardActions";
import Flashcard from "./Flashcard";

class FlashcardsByCategory extends Component {
  componentDidMount() {
    const { category } = this.props.match.params;
    this.props.getFlashcardsByCategory(category);
  }

  state = {
    currentFlashcard: {},
    currentFlashcardIndex: 0,
    started: false
  };

  redirectToHome() {
    this.props.history.push("/");
  }

  changeFlashcard(flashcards) {
    if (this.state.currentFlashcardIndex < flashcards.length) {
      this.setState({
        currentFlashcard: flashcards[this.state.currentFlashcardIndex],
        currentFlashcardIndex: this.state.currentFlashcardIndex + 1,
        started: true
      });
    } else {
      this.redirectToHome();
    }
  }

  render() {
    const { flashcardsByCategory } = this.props.flashcard;
    const { category } = this.props.match.params;

    return (
      <React.Fragment>
        {this.state.started ? (
          <div>
            <Flashcard flashcard={this.state.currentFlashcard}>
              <div className="btn-group" style={{ width: "100%" }}>
                <button
                  className="btn btn-danger btn-block"
                  onClick={this.changeFlashcard.bind(
                    this,
                    flashcardsByCategory
                  )}
                >
                  DALEJ
                </button>
              </div>
            </Flashcard>
          </div>
        ) : (
          <div>
            <div className="card mb-1 bg-light w-50 mx-auto">
              <div className="card-header text-light bg-success text-uppercase">
                <strong>{category}</strong>
              </div>
              <div className="card-body bg-light">
                <h5 className="card-title">
                  Liczba pytań rekrutacyjnych z zakresu {category} to:
                </h5>
              </div>
              <button
                className="btn btn-danger"
                onClick={this.changeFlashcard.bind(this, flashcardsByCategory)}
              >
                START
              </button>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  flashcard: state.flashcard
});

export default connect(
  mapStateToProps,
  { getFlashcardsByCategory }
)(FlashcardsByCategory);
