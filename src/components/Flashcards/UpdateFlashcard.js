import React, { Component } from "react";
import { connect } from "react-redux";
import { createFlashcard, getFlashcard } from "../../actions/flashcardActions";
import classnames from "classnames";

class UpdateFlashcard extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      question: "",
      answer: "",
      category: "",
      difficulty: 0,
      accepted: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors !== this.props.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    const { id, question, answer, category, accepted } = nextProps.flashcard;

    this.setState({
      id,
      question,
      answer,
      category,
      accepted
    });

    let difficulty;

    switch (nextProps.flashcard.difficulty) {
      case "JUNIOR":
        difficulty = 0;
        break;

      case "MID":
        difficulty = 1;
        break;

      case "SENIOR":
        difficulty = 2;
        break;

      default:
        difficulty = 0;
    }

    this.setState({
      difficulty: difficulty
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.getFlashcard(id, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const updateFlashcard = {
      id: this.state.id,
      question: this.state.question,
      answer: this.state.answer,
      category: this.state.category,
      difficulty: this.state.difficulty,
      accepted: this.state.accepted
    };

    if (this.props.location.state) {
      this.props.createFlashcard(
        updateFlashcard,
        this.props.history,
        "update",
        false,
        this.props.location.state.from
      );
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="flashcard">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Edytuj pytanie</h5>
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
  flashcard: state.flashcard.flashcard,
  errors: state.error
});

export default connect(
  mapStateToProps,
  { createFlashcard, getFlashcard }
)(UpdateFlashcard);
