import React, { Component } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { createTicket } from "../../actions/ticketActions";
import { connect } from "react-redux";

class Flashcard extends Component {
  onReportButtonClicked = (flashcard, message) => {
    const ticket = {
      flashcard: flashcard,
      message: ""
    };
    this.props.createTicket(ticket);
  };

  render() {
    const { flashcard } = this.props.flashcard;

    let answer = null;

    if (this.props.answerShowed) {
      answer = <pre>{flashcard.answer}</pre>;
    }

    let tooltip;
    let reportButton;

    if (flashcard.accepted) {
      tooltip = <Tooltip id="tooltip">Zgłoś błąd</Tooltip>;

      reportButton = (
        <OverlayTrigger placement="top" overlay={tooltip}>
          <svg
            id="i-flag"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="32"
            height="32"
            fill="none"
            stroke="currentcolor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M6 2 L6 30 M6 6 L26 6 20 12 26 18 6 18" />
          </svg>
        </OverlayTrigger>
      );
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
        <div
          className="text-right p-2"
          onClick={this.onReportButtonClicked.bind(this, flashcard, "")}
        >
          {reportButton}
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(
  null,
  { createTicket }
)(Flashcard);
