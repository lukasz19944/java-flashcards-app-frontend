import React, { Component } from "react";
import { connect } from "react-redux";
import { createFlashcard } from "../../actions/flashcardActions";

class AddFlashcard extends Component {
  constructor() {
    super();

    this.state = {
      question: "",
      answer: "",
      category: "",
      knowledgeLevel: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newFlashcard = {
      question: this.state.question,
      answer: this.state.answer,
      category: this.state.category,
      knowledgeLevel: this.state.knowledgeLevel
    };

    this.props.createFlashcard(newFlashcard, this.props.history);
  }

  render() {
    return (
      <div>
        <div className="flashcard">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Utwórz nowe pytanie</h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Pytanie"
                      name="question"
                      value={this.state.question}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      placeholder="Odpowiedź"
                      name="answer"
                      style={{ height: "200px" }}
                      value={this.state.answer}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Kategoria"
                      name="category"
                      value={this.state.category}
                      onChange={this.onChange}
                    />
                  </div>

                  <input
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { createFlashcard }
)(AddFlashcard);
