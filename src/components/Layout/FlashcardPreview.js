import React, { Component } from "react";
import { Button, Modal } from "reactstrap";
import Flashcard from "../Flashcards/Flashcard";

class FlashcardPreview extends Component {
  render() {
    return (
      <div>
        <Modal isOpen={true} size="lg">
          <Flashcard flashcard={this.props} answerShowed>
            <Button color="danger" onClick={this.props.close}>
              Zamknij
            </Button>
          </Flashcard>
        </Modal>
      </div>
    );
  }
}

export default FlashcardPreview;
