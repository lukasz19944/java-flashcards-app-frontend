import React, { Component } from "react";

class Flashcard extends Component {
  render() {
    const { flashcard } = this.props.flashcard;

    let answer = null;

    if (this.props.answerShowed) {
      answer = <pre>{flashcard.answer}</pre>;
    }

    return (
      <div
        className="card mb-1 bg-light mx-auto"
        style={{ height: "500px", width: "760px" }}
      >
        <div className="card-header text-light bg-success text-uppercase">
          <div className="float-left">
            <strong className="text-center">{flashcard.category}</strong>
          </div>
          <div className="float-right">
            <strong className="text-right">{flashcard.difficulty}</strong>
          </div>
        </div>

        <div className="card-body bg-light">
          <div>
            <h5 className="card-title">{flashcard.question}</h5>
          </div>

          <hr />
          <div className="card-text text-left mx-3">
            <pre>{answer}</pre>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Flashcard;
