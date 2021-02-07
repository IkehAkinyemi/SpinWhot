import React from "react";

const FirstPickedCard = ({ backCardContent, whichPlayerToUpdate }) => {
  return (
    <div>
      <div
      id="flip-card-back"
      className="guessedImage"
      style={
        backCardContent === null || backCardContent === undefined
          ? { display: "none" }
          : { display: "block" }
      }
    >
      <p className="fact-content">
        {backCardContent === null || backCardContent === undefined
          ? null
          : whichPlayerToUpdate
          ? backCardContent.firstElementChild.textContent
          : null}
      </p>
      <p className="hint">
        {whichPlayerToUpdate
          ? "Guess a card with the same content"
          : null}
      </p>
    </div>

    <p
      className="helper"
      style={
        backCardContent === null || backCardContent === undefined
          ? { display: "none" }
          : { display: "block" }
      }
    >
      Your first guessed card.
    </p>

  </div>
  )
}

export default FirstPickedCard;