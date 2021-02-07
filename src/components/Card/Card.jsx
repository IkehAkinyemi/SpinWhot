import React, { useState } from "react";
import "./Card.scss";


const Card = (props) => {
  const [idValue, setIdValue] = useState(false);

  function setID(e) {
    if (e.target.closest(".flip-card")) {
      setIdValue(prevValue => !prevValue);
    }
  }

  return (
    <div className="flip-card" onClick={setID} id={idValue ? "flip-card" : null }>
      <div className="flip-card-inner" ref={props.addRefs}>
        <div className="flip-card-front">
          <img
            src={props.srcLink}
            alt="front-card"
            id={props.id}
          />
        </div>
        
        <div className="flip-card-back">
          <p className="fact-content">{props.backCardContent}</p>
          <p className="hint">Guess a card with the same content</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
