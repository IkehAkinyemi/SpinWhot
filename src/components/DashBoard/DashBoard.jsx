import React from "react";
import "./DashBoard.scss";
import logo from "../../assets/spinWhotlogo.png";
import FirstPickedCardContent from "./displayFirstCard/FirstPickedCard";

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

          <FirstPickedCardContent  backCardContent={backCardContent} whichPlayerToUpdate={props.whichPlayerToUpdate}/>
          
          <p className="first-player__score-board">
            Score:{" "}
            <span className="first-player__score-figure">
              {props.playerOneScore}
            </span>
          </p>
        </div>

        <div className="second-player container">
          <p className="second-player__name">2nd Player</p>

          <FirstPickedCardContent  backCardContent={backCardContent} whichPlayerToUpdate={props.whichPlayerToUpdate}/>

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
          <a href="https://ikehakinyemi.hashnode.dev/introduction-to-spinwhot-game">Read more about SpinWhot on Hashnode</a>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
