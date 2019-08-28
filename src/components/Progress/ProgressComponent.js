import React, { Component } from "react";
import ProgressBarAll from "../Progress/ProgressBarAll";
import ProgressBarCategory from "../Progress/ProgressBarCategory";
import {
  countAllFlashcards,
  countAllFlashcardsByKnowledge,
  countAllFlashcardsByCategory,
  countAllFlashcardsByCategoryAndKnowledge,
  resetProgress
} from "../../actions/flashcardActions";
import { connect } from "react-redux";

class ProgressComponent extends Component {
  componentDidMount() {
    this.props.countAllFlashcards();
    this.props.countAllFlashcardsByKnowledge();
    this.props.countAllFlashcardsByCategory();
    this.props.countAllFlashcardsByCategoryAndKnowledge();
  }

  render() {
    const { countAllFlashcards } = this.props.flashcard;
    const { countAllFlashcardsByKnowledge } = this.props.flashcard;
    const { countAllFlashcardsByCategory } = this.props.flashcard;
    const { countAllFlashcardsByCategoryAndKnowledge } = this.props.flashcard;

    return (
      <div className="row">
        <div className="col-8 mx-auto">
          <div className="card mb-1 bg-light w-75 mx-auto">
            <div className="card-header text-black bg-warning text-uppercase">
              <h3>
                POSTĘP
                <button
                  className="btn btn-danger w-25 float-right"
                  onClick={this.props.resetProgress.bind(this)}
                >
                  Resetuj postęp
                </button>
              </h3>
            </div>
            <div className="card-body bg-light">
              <ProgressBarAll
                category={"Wszystkie"}
                countAllFlashcards={countAllFlashcards}
                countAllFlashcardsByKnowledge={countAllFlashcardsByKnowledge}
              />

              <hr className="m-2" />

              {Object.keys(countAllFlashcardsByCategory).map(category => (
                <ProgressBarCategory
                  key={category}
                  category={category}
                  countAllFlashcardsByCategory={countAllFlashcardsByCategory}
                  countAllFlashcardsByCategoryAndKnowledge={
                    countAllFlashcardsByCategoryAndKnowledge
                  }
                />
              ))}
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
  {
    countAllFlashcards,
    countAllFlashcardsByKnowledge,
    countAllFlashcardsByCategory,
    countAllFlashcardsByCategoryAndKnowledge,
    resetProgress
  }
)(ProgressComponent);
