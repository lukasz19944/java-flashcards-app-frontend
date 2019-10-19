import React, { Component } from "react";
import { getTicket, deleteTicket } from "../../actions/ticketActions";
import { connect } from "react-redux";
import FlashcardPreview from "../Layout/FlashcardPreview";
import { Link } from "react-router-dom";

class Ticket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flashcardPreview: ""
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.getTicket(id);
  }

  showFlashcardPreview = flashcard => {
    this.setState({
      flashcardPreview: (
        <FlashcardPreview
          flashcard={flashcard}
          close={this.closeFlashcardPreview}
          show
          canBeReported={false}
        />
      )
    });
  };

  closeFlashcardPreview = () => {
    this.setState({
      flashcardPreview: ""
    });
  };

  onDeleteClick = id => {
    this.props.deleteTicket(id, this.props.history);
  };

  render() {
    const { ticket } = this.props.ticket;
    const flashcard = this.props.flashcard;

    let flashcardId;

    if (ticket.flashcard) {
      flashcardId = ticket.flashcard.id;
    }

    return (
      <div
        className="card mb-1 bg-light mx-auto"
        style={{ height: "500px", width: "760px" }}
      >
        <div className="card-header text-light bg-success text-uppercase">
          Zgłoszenie numer {ticket.id} dotyczące pytania o numerze {flashcardId}
        </div>

        <div className="card-body bg-light">
          <div className="card-text text-left mx-3">
            <h5 className="card-title">Treść zgłoszenia:</h5>
            <hr />
            <pre>{ticket.message}</pre>
          </div>
        </div>

        <div className="btn-group">
          <button
            className="btn btn-secondary m-1"
            onClick={this.showFlashcardPreview.bind(this, flashcard)}
          >
            Podgląd pytania
          </button>
          <Link
            to={{
              pathname: `/updateFlashcard/${flashcard.id}`,
              state: { from: this.props.location.pathname }
            }}
            className="btn btn-secondary m-1"
          >
            Edycja pytania
          </Link>
          <button
            className="btn btn-secondary m-1"
            onClick={this.onDeleteClick.bind(this, ticket.id)}
          >
            Usuń zgłoszenie
          </button>
        </div>

        {this.state.flashcardPreview}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ticket: state.ticket,
  flashcard: state.flashcard.flashcard
});

export default connect(
  mapStateToProps,
  { getTicket, deleteTicket }
)(Ticket);
