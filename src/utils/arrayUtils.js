export const shuffleFlashcards = flashcards => {
  let counter = flashcards.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = flashcards[counter];
    flashcards[counter] = flashcards[index];
    flashcards[index] = temp;
  }

  return flashcards;
};
