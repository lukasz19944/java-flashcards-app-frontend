import React, { Component } from "react";
import { connect } from "react-redux";
import { createFlashcard } from "../../actions/flashcardActions";
import classnames from "classnames";

class AddFlashcard extends Component {
  constructor() {
    super();

    this.state = {
      question: "",
      answer: "",
      category: "",
      knowledgeLevel: "",
      difficulty: 0,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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
      knowledgeLevel: this.state.knowledgeLevel,
      difficulty: this.state.difficulty
    };

    const proposed =
      this.props.location.pathname === "/addFlashcard" ? false : true;

    this.props.createFlashcard(
      newFlashcard,
      this.props.history,
      "create",
      proposed
    );
  }

  render() {
    const { errors } = this.state;

    const text =
      this.props.location.pathname === "/addFlashcard" ? (
        <h5 className="display-4 text-center">Utwórz nowe pytanie</h5>
      ) : (
        <React.Fragment>
          <h5 className="display-4 text-center">Zaproponuj nowe pytanie</h5>
          <h6 className="display-6 text-center text-muted">
            Zostanie dodane po zaakceptowaniu przez administratora
          </h6>
        </React.Fragment>
      );

    return (
      <div>
        <div className="flashcard">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                {text}
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.question
                      })}
                      placeholder="Pytanie"
                      name="question"
                      value={this.state.question}
                      onChange={this.onChange}
                    />
                    {errors.question && (
                      <div className="invalid-feedback">{errors.question}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <textarea
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.answer
                      })}
                      placeholder="Odpowiedź"
                      name="answer"
                      style={{ height: "200px" }}
                      value={this.state.answer}
                      onChange={this.onChange}
                    />
                    {errors.answer && (
                      <div className="invalid-feedback">{errors.answer}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.category
                      })}
                      placeholder="Kategoria"
                      name="category"
                      value={this.state.category}
                      onChange={this.onChange}
                    />
                    {errors.category && (
                      <div className="invalid-feedback">{errors.category}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="difficulty"
                      value={this.state.difficulty}
                      onChange={this.onChange}
                    >
                      <option value={0}>Junior</option>
                      <option value={1}>Mid</option>
                      <option value={2}>Senior</option>
                    </select>
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

const mapStateToProps = state => ({
  errors: state.error
});

export default connect(
  mapStateToProps,
  { createFlashcard }
)(AddFlashcard);
