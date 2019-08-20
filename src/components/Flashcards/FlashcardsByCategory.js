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
    started: false,
    finished: false,
    answered: false
  };

  redirectToHome() {
    this.props.history.push("/");
  }

  changeFlashcard(flashcards) {
    if (this.state.currentFlashcardIndex < flashcards.length) {
      this.setState({
        currentFlashcard: flashcards[this.state.currentFlashcardIndex],
        currentFlashcardIndex: this.state.currentFlashcardIndex + 1,
        started: true,
        answerShowed: false
      });
    } else {
      this.setState({
        finished: true
      });
    }
  }

  showAnswer() {
    this.setState({
      answerShowed: true
    });
  }

  render() {
    const { flashcardsByCategory } = this.props.flashcard;
    const { category } = this.props.match.params;

    let buttons = (
      <button
        className="btn btn-danger btn-block"
        onClick={this.showAnswer.bind(this)}
      >
        POKAŻ ODPOWIEDŹ
      </button>
    );

    if (this.state.answerShowed) {
      buttons = (
        <button
          className="btn btn-danger btn-block"
          onClick={this.changeFlashcard.bind(this, flashcardsByCategory)}
        >
          DALEJ
        </button>
      );
    }

    return (
      <React.Fragment>
        {!this.state.finished ? (
          this.state.started ? (
            <div>
              <Flashcard
                flashcard={this.state.currentFlashcard}
                answerShowed={this.state.answerShowed}
              >
                <div className="btn-group" style={{ width: "100%" }}>
                  {buttons}
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
                  onClick={this.changeFlashcard.bind(
                    this,
                    flashcardsByCategory
                  )}
                >
                  START
                </button>
              </div>
            </div>
          )
        ) : (
          <div
            className="card mb-1 bg-light w-50 mx-auto"
            style={{ height: "500px" }}
          >
            <div className="card-header text-light bg-success text-uppercase">
              {category}
            </div>
            <div className="card-body bg-light">
              <h5 className="card-title">Nie ma już więcej pytań</h5>
              <table className="table mt-5">
                <tbody>
                  <tr>
                    <td>Wiem:</td>
                    <td>999</td>
                  </tr>
                  <tr>
                    <td>Nie wiem:</td>
                    <td>999</td>
                  </tr>
                  <tr>
                    <td />
                    <td>100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              className="btn btn-danger"
              onClick={this.redirectToHome.bind(this)}
            >
              WRÓĆ DO STRONY GŁÓWNEJ
            </button>
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
