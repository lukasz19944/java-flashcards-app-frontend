import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getNotAcceptedFlashcards,
  acceptFlashcard,
  rejectFlashcard
} from "../../actions/flashcardActions";
import FlashcardPreview from "../Layout/FlashcardPreview";

class ProposedFlashcards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flashcardPreview: "",
      notAcceptedFlashcards: this.props.flashcard.notAcceptedFlashcards,
      searched: false
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const currentList = this.props.flashcard.notAcceptedFlashcards;

    const newList = currentList.filter(item => {
      const lc = item.question.toLowerCase();
      const filter = e.target.value.toLowerCase();
      return lc.includes(filter);
    });

    this.setState({
      notAcceptedFlashcards: newList,
      searched: true
    });
  }

  componentDidMount() {
    this.props.getNotAcceptedFlashcards();
  }

  showFlashcardPreview = flashcard => {
    this.setState({
      flashcardPreview: (
        <FlashcardPreview
          flashcard={flashcard}
          close={this.closeFlashcardPreview}
          accept={this.acceptFlashcard.bind(this, flashcard.id)}
          reject={this.rejectFlashcard.bind(this, flashcard.id)}
          show
        />
      )
    });
  };

  closeFlashcardPreview = () => {
    this.setState({
      flashcardPreview: ""
    });
  };

  acceptFlashcard = id => {
    this.props.acceptFlashcard(id);
  };

  rejectFlashcard = id => {
    this.props.rejectFlashcard(id);
  };

  render() {
    let { notAcceptedFlashcards } = this.props.flashcard;

    if (this.state.searched) {
      notAcceptedFlashcards = this.state.notAcceptedFlashcards;
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
                  </tr>
                </thead>
                <tbody>
                  {notAcceptedFlashcards.map(flashcard => (
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
  { getNotAcceptedFlashcards, acceptFlashcard, rejectFlashcard }
)(ProposedFlashcards);
