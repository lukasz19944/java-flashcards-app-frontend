import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCategories,
  countAllFlashcards,
  countAllFlashcardsByKnowledge
} from "../../actions/flashcardActions";
import Category from "./Category";
import ProgressBar from "../Progress/ProgressBar";

class Categories extends Component {
  componentDidMount() {
    this.props.getCategories();
    this.props.countAllFlashcards();
    this.props.countAllFlashcardsByKnowledge();
  }
  render() {
    const { categories } = this.props.flashcard;
    const { countAllFlashcards } = this.props.flashcard;
    const { countAllFlashcardsByKnowledge } = this.props.flashcard;

    let firstCol = [];
    let secondCol = [];
    let thirdCol = [];

    for (let i = 0; i < categories.length; i++) {
      if (i % 3 === 0) firstCol.push(categories[i]);
      if (i % 3 === 1) secondCol.push(categories[i]);
      if (i % 3 === 2) thirdCol.push(categories[i]);
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card mb-1 bg-light w-75 mx-auto">
              <div className="card-header text-black bg-warning text-uppercase">
                <h3>POSTĘP</h3>
              </div>
              <div className="card-body bg-light">
                <ProgressBar
                  category={"Wszystkie"}
                  countAllFlashcards={countAllFlashcards}
                  countAllFlashcardsByKnowledge={countAllFlashcardsByKnowledge}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {firstCol.map(category => (
              <Category key={category} category={category} />
            ))}
          </div>
          <div className="col">
            {secondCol.map(category => (
              <Category key={category} category={category} />
            ))}
          </div>
          <div className="col">
            {thirdCol.map(category => (
              <Category key={category} category={category} />
            ))}
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
    getCategories,
    countAllFlashcards,
    countAllFlashcardsByKnowledge
  }
)(Categories);
