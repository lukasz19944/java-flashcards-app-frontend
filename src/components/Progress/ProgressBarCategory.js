import React, { Component } from "react";

class ProgressBarCategory extends Component {
  render() {
    return (
      <div className="row align-items-center h-30 mb-2">
        <div className="col-3 my-auto text-right">
          <h6 className="m-0">{this.props.category}</h6>
        </div>

        <div className="col-7 my-auto">
          <div className="progress" style={{ backgroundColor: "#f28361" }}>
            <div
              className="progress-bar bg-success"
              style={{
                width:
                  Number(
                    (this.props.countAllFlashcardsByCategoryAndKnowledge[
                      this.props.category
                    ] /
                      this.props.countAllFlashcardsByCategory[
                        this.props.category
                      ]) *
                      100
                  ).toFixed(0) + "%"
              }}
            />
          </div>
        </div>
        <div className="col-2 my-auto">
          <h6 className="m-0">
            {
              this.props.countAllFlashcardsByCategoryAndKnowledge[
                this.props.category
              ]
            }
            /{this.props.countAllFlashcardsByCategory[this.props.category]}
          </h6>
        </div>
      </div>
    );
  }
}

export default ProgressBarCategory;
