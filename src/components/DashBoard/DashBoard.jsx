import React from "react";
import "./DashBoard.scss";
import logo from "../../assets/spinWhotlogo.png";

const DashBoard = (props) => {
  let { backCardContent } = props.playerGuess;
  return (
    <div className="dash-board">
      <div className="logo-container">
        <img src={logo} alt="logo" />
      </div>
      <div className="players">
        <div className="first-player container">
          <p className="first-player__name">1st Player</p>

          <div
            className="flip-card-back"
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
                : props.whichPlayerToUpdate
                ? backCardContent.firstElementChild.textContent
                : null}
            </p>
            <p className="hint">
              {props.whichPlayerToUpdate
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

          <p className="first-player__score-board">
            Score:{" "}
            <span className="first-player__score-figure">
              {props.playerOneScore}
            </span>
          </p>
        </div>

        <div className="second-player container">
          <p className="second-player__name">2nd Player</p>

          <div
            className="flip-card-back"
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
                : !props.whichPlayerToUpdate
                ? backCardContent.firstElementChild.textContent
                : null}
            </p>
            <p className="hint">
              {!props.whichPlayerToUpdate
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

          <p className="second-player__score-board">
            Score:{" "}
            <span className="second-player__score-figure">
              {props.playerTwoScore}
            </span>
          </p>
        </div>
      </div>
      <div className="intro">
        <div className="welcome-intro welcome-intro-summary">
          How to play SpinWhot
        </div>

        <div className="welcome-intro hashnode-docs">
          <a href="#">Read more about SpinWhot on Hashnode</a>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
