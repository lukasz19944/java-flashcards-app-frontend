import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../actions/flashcardActions";
import Category from "./Category";

class Categories extends Component {
  componentDidMount() {
    this.props.getCategories();
  }
  render() {
    const { categories } = this.props.flashcard;

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
    getCategories
  }
)(Categories);
