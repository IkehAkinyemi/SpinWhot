import React, { useState, useEffect, useRef } from "react";
import "./Glass.scss";
import DashBoard from "../DashBoard/DashBoard";
import Card from "../Card/Card";
import frontImages from "../../assets/imageHrefs/imagesLinks";

let shuffledFrontImages = [],
  randomNumArr = [], helperFlag = false;

function shuffleImage(randomNumArr, shuffledFrontImages, originalArr) {
  let randomGeneratedNum = (function () {
    return Math.floor(Math.random() * originalArr.length);
  })();

  if (
    !randomNumArr.includes(randomGeneratedNum) &&
    randomNumArr.length !== originalArr.length
  ) {
    randomNumArr.push(randomGeneratedNum);
    shuffledFrontImages.push(originalArr[randomGeneratedNum]);
    shuffleImage(randomNumArr, shuffledFrontImages, originalArr);
  } else {
    if (
      randomNumArr.includes(randomGeneratedNum) &&
      randomNumArr.length !== originalArr.length
    ) {
      shuffleImage(randomNumArr, shuffledFrontImages, originalArr);
    }
  }

  return shuffledFrontImages;
}

shuffledFrontImages = shuffleImage(
  randomNumArr,
  shuffledFrontImages,
  frontImages
);

//Automatic playerTwo kits
let playerTwoKit = {
  randomNumber: [],
  playerTwoscoreBoardFigure: 0,
  playerTwoCardImgLink: [],
  playerTwoGuessArr: [],
};

let {
  randomNumber,
  playerTwoscoreBoardFigure,
  playerTwoCardImgLink,
  playerTwoGuessArr,
} = playerTwoKit;

const GlassBackground = (props) => {

  const cardRefs = useRef([]);
  const [catFacts, setCatFacts] = useState([]);
  const [frontCardImgs, setFrontCardImgs] = useState(shuffledFrontImages);
  const [clickedImage, setClickedImage] = useState({});
  const [guessState, setGuessState] = useState({
    guessModal: false,
    correctGuess: false,
  });
  const [playerOneKit, setPlayersKits] = useState({
    playerOnescoreBoardFigure: 0,
    updatePlayerTwoScore: 0,
    playerOneCardImgLink: [],
    playerOneGuessArr: [],
    playerCurrentGuess: "",
    currentPlayer: true,
  });
  const [displayBool, setDisplayBool] = useState(false);
  let {
    playerOnescoreBoardFigure,
    updatePlayerTwoScore,
    playerOneCardImgLink,
    playerOneGuessArr,
    playerCurrentGuess,
    currentPlayer,
  } = playerOneKit;

  let { guessModal, correctGuess } = guessState;

  const addRefsToCards = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    fetch("https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=20")
      .then(response => response.json())
      .then(data => {
        data = data.map(item => item.text);
        setCatFacts(shuffleImage([], [], [...data, ...data]));
      });
  }, []);

  function currentGameState(e) {
    let backCardContent = e.target.parentElement.nextElementSibling;
    playerCurrentGuess =
      e.target.tagName === "IMG"
        ? e.target.parentElement.nextElementSibling.firstElementChild
            .textContent
        : "";

    //Game Logic for playerOne
    if (currentPlayer && e.target.tagName === "IMG") {
      if (playerOneGuessArr.length === 0) {
        setClickedImage({ backCardContent });
        e.target.closest(".flip-card-inner").id = "flip-card-inner";
        setPlayersKits((prevValue) => ({
          ...prevValue,
          playerOneCardImgLink: [e.target.src],
          playerOneGuessArr: [
            ...prevValue.playerOneGuessArr,
            playerCurrentGuess,
          ],
        }));
      } else if (playerOneGuessArr.length === 1) {
        if (playerOneGuessArr[0] === playerCurrentGuess) {
          e.target.closest(".flip-card-inner").id = "flip-card-inner";
          setPlayersKits((prevValue) => ({
            ...prevValue,
            playerOnescoreBoardFigure: prevValue.playerOnescoreBoardFigure + 4,
            playerOneGuessArr: [],
            currentPlayer: false,
          }));

          setTimeout(() => {
            setGuessState({ guessModal: true, correctGuess: true });
          }, 1000);

          setTimeout(() => {
            setGuessState({ guessModal: false, correctGuess: true });
          }, 2000);

          setTimeout(() => {
            cardRefs.current.forEach((el) => {
              if(el.lastElementChild.firstElementChild.textContent === playerCurrentGuess) {
                el.id = "cancel-flip-card-inner";
              }
            });
          }, 2170)

          setTimeout(() => {
            setCatFacts((prevValue) => {
              return prevValue.filter((fact) => fact !== playerCurrentGuess);
            });

            setFrontCardImgs((prevValue) => {
              let newArr = [...prevValue];
              newArr.splice(0, 2);
              
              return [...newArr];
            });

            // setPlayersKits((prevValue) => ({
            //   ...prevValue,
            //   playerOneCardImgLink: [],
            // }));

            cardRefs.current.forEach( el => el.id = "cancel-flip-card-inner");

            for (let el of cardRefs.current) {
              if (el.lastElementChild.firstElementChild.textContent === playerTwoGuessArr[0]) {
                el.id = "flip-card-inner";
                setClickedImage({ backCardContent: el.lastElementChild });
                break;
              } else if (playerTwoGuessArr[0] === undefined) {
                setClickedImage({ backCardContent: null });
              }
            }
          }, 2400);

          helperFlag = true;

          //playerTwo game entrance
          setTimeout(() => {
            playerTwoGameState(e);
          }, 2700);
        } else if (playerOneGuessArr[0] !== playerCurrentGuess) {
          e.target.closest(".flip-card-inner").id = "flip-card-inner";

          setTimeout(() => {
            e.target.closest(".flip-card-inner").id = "cancel-flip-card-inner";
          }, 1000);

          setPlayersKits((prevValue) => ({
            ...prevValue,
            currentPlayer: false,
          }));

          setTimeout(() => {
            setGuessState({ guessModal: true, correctGuess: false });
          }, 1000);

          setTimeout(() => {
            setGuessState({ guessModal: false, correctGuess: false });
          }, 2000);

          //playerTwo game entrance
          setTimeout(() => {
            playerTwoGameState(e);
          }, 2700);
        }
      }
    }
  }

  // Game logic for playerTwo
  function playerTwoGameState(e) {
    //randomize second playerTwo
    function randomGuess() {
      let num = Math.floor(Math.random() * frontCardImgs.length);

      if (randomGuess[0] === num) {
        randomGuess();
      }

      if(cardRefs.current[num].id === "flip-card-inner") {
        randomGuess();
      }

      randomNumber.push(num);
      return num;
    }

    if (playerTwoGuessArr.length === 0) {
      e = cardRefs.current[randomGuess()];
      playerCurrentGuess = e.lastElementChild.firstElementChild.textContent;

      setClickedImage({ backCardContent: e.lastElementChild });

      e.id = "flip-card-inner";

      playerTwoGuessArr.push(playerCurrentGuess);

      playerTwoGameState(e);
    } else if (playerTwoGuessArr.length === 1) {
      e = cardRefs.current[randomGuess()];
      playerCurrentGuess = e.lastElementChild.firstElementChild.textContent;

      if (playerTwoGuessArr[0] === playerCurrentGuess) {
        e.id = "flip-card-inner";

        setPlayersKits((prevValue) => ({
          ...prevValue,
          updatePlayerTwoScore: (playerTwoscoreBoardFigure += 4),
          currentPlayer: true,
        }));

        setTimeout(() => {
          setGuessState({ guessModal: true, correctGuess: true });
        }, 1000);

        setTimeout(() => {
          setGuessState({ guessModal: false, correctGuess: true });
        }, 2000);

        setTimeout(() => {
          cardRefs.current.forEach((el) => {
            if(el.lastElementChild.firstElementChild.textContent === playerCurrentGuess) {
              el.id = "cancel-flip-card-inner";
            }
          });
        }, 2170);

        setTimeout(() => {
          setCatFacts((prevValue) => {
            return prevValue.filter((fact) => fact !== playerCurrentGuess);
          });

          setFrontCardImgs((prevValue) => {
            prevValue.splice(0, 2);
            return shuffleImage([], [], [...prevValue]);
          });

          cardRefs.current.forEach( el => {
            if (el.lastElementChild.firstElementChild.textContent === playerOneGuessArr[0]) {
              el.id = "cancel-flip-card-inner";
            }
          });

          for (let el of cardRefs.current) {
            el.id = "cancel-flip-card-inner";
            if (el.lastElementChild.firstElementChild.textContent === playerOneGuessArr[0]) {
              el.id = "flip-card-inner";
              setClickedImage({ backCardContent: el.lastElementChild });
              break;
            } else if (helperFlag) {
              setClickedImage({ backCardContent: null });
            }
          }
        }, 2400);

        randomNumber = [];
        playerTwoGuessArr = [];

        return;
      } else if (playerTwoGuessArr[0] !== playerCurrentGuess) {
        e.id = "flip-card-inner";

        setTimeout(() => {
          e.id = "cancel-flip-card-inner";

          for (let el of cardRefs.current) {
            if (el.lastElementChild.firstElementChild.textContent === playerOneGuessArr[0]) {
              setClickedImage({ backCardContent: el.lastElementChild });
              break;
            }
          }
        }, 1000);

        setPlayersKits((prevValue) => ({
          ...prevValue,
          currentPlayer: true,
        }));

        setTimeout(() => {
          setGuessState({ guessModal: true, correctGuess: false });
        }, 1000);

        setTimeout(() => {
          setGuessState({ guessModal: false, correctGuess: false });
        }, 2000);

        randomNumber = [randomNumber[0]];
      }
    }
  }

  const removeElement = () => {
    setDisplayBool(false);
  }

  const displayElement = e => {
    if (e.target.closest(".intro")) {
      setDisplayBool(true);
    }
  }

  return (
    <section className="glass" onClick={(e) => {
      currentGameState(e);

      if (e.target.closest(".intro")) {
        displayElement(e);
      }
    }}>
      <DashBoard
        whichPlayerToUpdate={currentPlayer}
        playerGuess={clickedImage}
        playerOneScore={playerOnescoreBoardFigure}
        playerTwoScore={updatePlayerTwoScore}
      />
      <section id="card-container">
        <div
          className="guess-modal"
          style={guessModal ? { display: "block" } : { display: "none" }}
        >
          <p style={correctGuess ? { color: "green" } : { color: "red" }}>
            {correctGuess ? "Correct Guess" : "Wrong Guess"}
          </p>
        </div>
        {frontCardImgs.map((img, index) => {
          return (
            <Card
              srcLink={img}
              id={index}
              key={index}
              backCardContent={catFacts[index]}
              addRefs={addRefsToCards}
            />
          );
        })}

        <div className="learn-to-play" style={{display: displayBool ? "block" : "none" }}>
          <div className="visible">
            <p className="cancel-btn" onClick={removeElement}>X</p>
          </div>
  
            <br />

          <p>Welcome...</p>

            <br />

          <p className="learn-to-play-para">
            Here's a quick guide to playing SpinWhot. Click on any card of your choice, and watch spin to unveil
            the hidden cat fact behind it. After that try to guess another card with the same content as the 
            first chosen card. If guessed right you score 2 points against your opponent and the whole cards reshuffles. 
            But if you guessed wrongly you score no point at all, and wait for your next playing turn to try 
            guessing again what card has the same hidden content as your initial chosen card. Fun right. 🤩
          </p>
            <br />
          <p>
            Your opponent, a simple bot, follows the same process of picking a card and also guessing the second 
            card with the same hidden content as the first choosen card. If the bot loses he scores no point. And you must 
            guessed it right, it's your turn to play again.
          </p>

            <br />

          <p>
            There're 40 cards in total to be played, and player with the highest points gained from guessing more correct pairs of 
            cards with the same contents wins the game
          </p>

          <br />

          <p>
            GG!
          </p>
        </div>
      </section>
    </section>
  );
};

export default GlassBackground;
