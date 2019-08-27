import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getFlashcardsByCategory,
  createFlashcard,
  getFlashcardsByCategoryAndDifficulty
} from "../../actions/flashcardActions";
import Flashcard from "./Flashcard";

class FlashcardsByCategory extends Component {
  componentDidMount() {
    const { category } = this.props.match.params;
    const { difficulty } = this.props.match.params;
    this.props.getFlashcardsByCategoryAndDifficulty(category, difficulty);
  }

  state = {
    currentFlashcard: {},
    currentFlashcardIndex: 0,
    started: false,
    finished: false,
    answerShowed: false,
    answered: false,
    correctAnswersCounter: 0,
    incorrectAnswersCounter: 0
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
        answerShowed: false,
        answered: false
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

  updateKnowledgeLevel(correctAnswer) {
    let knowledgeLevel = this.state.currentFlashcard.knowledgeLevel;

    if (correctAnswer) {
      if (knowledgeLevel < 2) {
        knowledgeLevel++;
      }

      this.setState({
        correctAnswersCounter: this.state.correctAnswersCounter + 1
      });
    } else {
      if (knowledgeLevel > 0) {
        knowledgeLevel--;
      }

      this.setState({
        incorrectAnswersCounter: this.state.incorrectAnswersCounter + 1
      });
    }

    const updatedFlashcard = {
      id: this.state.currentFlashcard.id,
      question: this.state.currentFlashcard.question,
      answer: this.state.currentFlashcard.answer,
      category: this.state.currentFlashcard.category,
      difficulty: this.state.currentFlashcard.difficulty,
      knowledgeLevel: knowledgeLevel
    };

    this.props.createFlashcard(updatedFlashcard);

    this.setState({
      answered: true
    });
  }

  render() {
    const { flashcardsByCategoryAndDifficulty } = this.props.flashcard;
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
        <div className="w-100">
          <button
            className="btn btn-danger w-50"
            onClick={this.updateKnowledgeLevel.bind(this, false)}
          >
            NIE WIEM
          </button>
          <button
            className="btn btn-danger w-50"
            onClick={this.updateKnowledgeLevel.bind(this, true)}
          >
            WIEM
          </button>
        </div>
      );
    }

    if (this.state.answered) {
      buttons = (
        <button
          className="btn btn-danger btn-block"
          onClick={this.changeFlashcard.bind(
            this,
            flashcardsByCategoryAndDifficulty
          )}
        >
          DALEJ
        </button>
      );
    }

    let result = 0;

    if (
      this.state.correctAnswersCounter + this.state.incorrectAnswersCounter !==
      0
    ) {
      result = Number(
        (this.state.correctAnswersCounter /
          (this.state.correctAnswersCounter +
            this.state.incorrectAnswersCounter)) *
          100
      ).toFixed(0);
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
              <div
                className="card mb-1 bg-light mx-auto"
                style={{ width: "760px" }}
              >
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
                    flashcardsByCategoryAndDifficulty
                  )}
                >
                  START
                </button>
              </div>
            </div>
          )
        ) : (
          <div
            className="card mb-1 bg-light mx-auto"
            style={{ height: "500px", width: "760px" }}
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
                    <td>{this.state.correctAnswersCounter}</td>
                  </tr>
                  <tr>
                    <td>Nie wiem:</td>
                    <td>{this.state.incorrectAnswersCounter}</td>
                  </tr>
                  <tr>
                    <td />
                    <td>{result}%</td>
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
  {
    getFlashcardsByCategory,
    getFlashcardsByCategoryAndDifficulty,
    createFlashcard
  }
)(FlashcardsByCategory);
