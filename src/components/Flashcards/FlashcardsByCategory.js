import React, { Component } from "react";
import { connect } from "react-redux";
import { getFlashcardsByCategory } from "../../actions/flashcardActions";

class FlashcardsByCategory extends Component {
  componentDidMount() {
    const { category } = this.props.match.params;
    this.props.getFlashcardsByCategory(category);
  }

  render() {
    const { flashcardsByCategory } = this.props.flashcard;

    return (
      <div className="flashcards">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Wszystkie pytania</h1>
              <br />

              <hr />

              <table className="table">
                <thead>
                  <tr>
                    <th>Pytanie</th>
                    <th>Odpowiedź</th>
                    <th>Kategoria</th>
                  </tr>
                </thead>
                <tbody>
                  {flashcardsByCategory.map(flashcard => (
                    <tr key={flashcard.id}>
                      <td className="text-left align-middle">
                        {flashcard.question}
                      </td>
                      <td className="text-left align-middle">
                        {flashcard.answer}
                      </td>
                      <td className="align-middle">{flashcard.category}</td>
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
  { getFlashcardsByCategory }
)(FlashcardsByCategory);
