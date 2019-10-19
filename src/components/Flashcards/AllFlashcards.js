import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAcceptedFlashcards,
  deleteFlashcard
} from "../../actions/flashcardActions";
import { Link } from "react-router-dom";
import FlashcardPreview from "../Layout/FlashcardPreview";

class AllFlashcards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flashcardPreview: "",
      acceptedFlashcards: this.props.flashcard.acceptedFlashcards,
      searched: false
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const currentList = this.props.flashcard.acceptedFlashcards;

    const newList = currentList.filter(item => {
      const lc = item.question.toLowerCase();
      const filter = e.target.value.toLowerCase();
      return lc.includes(filter);
    });

    this.setState({
      acceptedFlashcards: newList,
      searched: true
    });
  }

  componentDidMount() {
    this.props.getAcceptedFlashcards();
  }

  onDeleteClick = id => {
    this.props.deleteFlashcard(id);
    this.setState({
      acceptedFlashcards: this.state.acceptedFlashcards.filter(
        flashcard => flashcard.id !== id
      )
    });
  };

  showFlashcardPreview = flashcard => {
    this.setState({
      flashcardPreview: (
        <FlashcardPreview
          flashcard={flashcard}
          close={this.closeFlashcardPreview}
          show
          canBeReported={true}
        />
      )
    });
  };

  closeFlashcardPreview = () => {
    this.setState({
      flashcardPreview: ""
    });
  };

  render() {
    let { acceptedFlashcards } = this.props.flashcard;

    if (this.state.searched) {
      acceptedFlashcards = this.state.acceptedFlashcards;
    }

    return (
      <div className="flashcards">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Wszystkie pytania</h1>
              <br />

              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Szukaj"
                name="search"
                onChange={this.onChange}
              />

              <hr />

              {this.state.flashcardPreview}

              <table className="table">
                <thead>
                  <tr>
                    <th className="w-50">Pytanie</th>
                    <th>Kategoria</th>
                    <th>Poziom</th>
                    <th>Podgląd</th>
                    <th>Edytuj</th>
                    <th>Usuń</th>
                  </tr>
                </thead>
                <tbody>
                  {acceptedFlashcards.map(flashcard => (
                    <tr key={flashcard.id}>
                      <td className="text-left align-middle">
                        {flashcard.question}
                      </td>
                      <td className="align-middle">{flashcard.category}</td>
                      <td className="align-middle">{flashcard.difficulty}</td>
                      <td className="align-middle">
                        <button
                          className="btn btn-link"
                          onClick={this.showFlashcardPreview.bind(
                            this,
                            flashcard
                          )}
                        >
                          <svg
                            id="i-eye"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentcolor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          >
                            <circle cx="17" cy="15" r="1" />
                            <circle cx="16" cy="16" r="6" />
                            <path d="M2 16 C2 16 7 6 16 6 25 6 30 16 30 16 30 16 25 26 16 26 7 26 2 16 2 16 Z" />
                          </svg>
                        </button>
                      </td>
                      <td className="align-middle">
                        <Link
                          to={{
                            pathname: `/updateFlashcard/${flashcard.id}`,
                            state: { from: this.props.location.pathname }
                          }}
                        >
                          <svg
                            id="i-edit"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentcolor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          >
                            <path d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z" />
                          </svg>
                        </Link>
                      </td>
                      <td className="align-middle">
                        <button
                          className="btn btn-link"
                          onClick={this.onDeleteClick.bind(this, flashcard.id)}
                        >
                          <svg
                            id="i-trash"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentcolor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          >
                            <path d="M28 6 L6 6 8 30 24 30 26 6 4 6 M16 12 L16 24 M21 12 L20 24 M11 12 L12 24 M12 6 L13 2 19 2 20 6" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  flashcard: state.flashcard
});

export default connect(
  mapStateToProps,
  { getAcceptedFlashcards, deleteFlashcard }
)(AllFlashcards);
