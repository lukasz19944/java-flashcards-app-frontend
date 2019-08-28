import React, { Component } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../actions/flashcardActions";
import Category from "./Category";

class Categories extends Component {
  state = {
    active: [true, false, false, false],
    currentDifficulty: "all"
  };

  componentDidMount() {
    this.props.getCategories();
  }

  changeLevel(option) {
    var buttons = document.getElementsByName("options");

    for (let i = 0; i < 4; i++) {
      if (buttons[i].id === option) {
        this.setState(prevState => {
          const newItems = [...prevState.active];
          newItems[i] = true;
          return { active: newItems, currentDifficulty: buttons[i].id };
        });
      } else {
        this.setState(prevState => {
          const newItems = [...prevState.active];
          newItems[i] = false;
          return { active: newItems };
        });
      }
    }
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
            <h4>Wybierz poziom pytań</h4>
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label
                className={
                  this.state.active[0]
                    ? "btn btn-outline-dark active"
                    : "btn btn-outline-dark"
                }
              >
                <input
                  type="radio"
                  name="options"
                  id="all"
                  onClick={() => this.changeLevel("all")}
                />
                WSZYSTKIE
              </label>
              <label
                className={
                  this.state.active[1]
                    ? "btn btn-outline-dark active"
                    : "btn btn-outline-dark"
                }
              >
                <input
                  type="radio"
                  name="options"
                  id="junior"
                  onClick={() => this.changeLevel("junior")}
                />
                JUNIOR
              </label>
              <label
                className={
                  this.state.active[2]
                    ? "btn btn-outline-dark active"
                    : "btn btn-outline-dark"
                }
              >
                <input
                  type="radio"
                  name="options"
                  id="mid"
                  onClick={() => this.changeLevel("mid")}
                />
                MID
              </label>
              <label
                className={
                  this.state.active[3]
                    ? "btn btn-outline-dark active"
                    : "btn btn-outline-dark"
                }
              >
                <input
                  type="radio"
                  name="options"
                  id="senior"
                  onClick={() => this.changeLevel("senior")}
                />
                SENIOR
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {firstCol.map(category => (
              <Category
                key={category}
                category={category}
                currentDifficulty={this.state.currentDifficulty}
              />
            ))}
          </div>
          <div className="col">
            {secondCol.map(category => (
              <Category
                key={category}
                category={category}
                currentDifficulty={this.state.currentDifficulty}
              />
            ))}
          </div>
          <div className="col">
            {thirdCol.map(category => (
              <Category
                key={category}
                category={category}
                currentDifficulty={this.state.currentDifficulty}
              />
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
  { getCategories }
)(Categories);
