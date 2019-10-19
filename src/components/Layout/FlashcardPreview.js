import React, { Component } from "react";
import { Button, Modal } from "reactstrap";
import Flashcard from "../Flashcards/Flashcard";

class FlashcardPreview extends Component {
  render() {
    const flashcardButtons =
      this.props.flashcard.accepted === true ? (
        ""
      ) : (
        <div className="w-100">
          <Button color="info w-50" onClick={this.props.accept}>
            Zaakceptuj
          </Button>
          <Button color="warning w-50" onClick={this.props.reject}>
            Odrzuć
          </Button>
        </div>
      );

    return (
      <div>
        <Modal isOpen={true} size="lg">
          <Flashcard
            flashcard={this.props}
            answerShowed
            canBeReported={this.props.canBeReported}
          >
            {flashcardButtons}
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
