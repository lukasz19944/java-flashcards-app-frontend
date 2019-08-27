import React, { Component } from "react";
import { Link } from "react-router-dom";

class Category extends Component {
  render() {
    const { category } = this.props;
    const { currentDifficulty } = this.props;

    return (
      <div className="card mb-1 bg-light w-75 mx-auto my-5">
        <div className="card-header text-light bg-success text-uppercase">
          {category}
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">Pytania rekrutacyjne z zakresu:</h5>
          <h4>{category}</h4>
          <Link
            to={`/category/${category}/${currentDifficulty}`}
            className="btn btn-primary mt-2"
          >
            START
          </Link>
        </div>
      </div>
    );
  }
}

export default Category;
