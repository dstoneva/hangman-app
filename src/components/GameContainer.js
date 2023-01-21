import Header from "./Header";
import Gallow from "./Gallow";
import Keyboard from "./Keyboard";
import GameProgress from "./GameProgress";
import "../styles/GameContainer.css";
import { useEffect, useState, createContext } from "react";
import { pickRandomElement, shuffleArray } from "../Utils";
import { dictionary, allLetters } from "../Constants";
import WordToGuess from "./WordToGuess";
import GameEndModal from "./GameEndModal";
import { useLocalStorage } from "../UseLocalStorage";

export const GameContext = createContext();

const GameContainer = () => {
  const [correctAnswer, setCorrectAnswer] = useLocalStorage("correctAnswer", "");
  const [wrongGuesses, setWrongGuesses] = useLocalStorage("wrongGuesses", 0);
  const [usedLetters, setUsedLetters] = useLocalStorage("usedLetters", []);
  const [gameEnded, setGameEnded] = useState(false);
  const [outcome, setOutcome] = useLocalStorage("outcome", "");
  const [keys, setKeys] = useLocalStorage("keys", []);

  const addUsedLetters = (letter) => {
    if (wrongGuesses + 1 <= 6) {
      setUsedLetters([...usedLetters, letter]);
      if (!correctAnswer.includes(letter)) {
        setWrongGuesses(wrongGuesses + 1);
      }
    }
  };

  const pickRandomCorrectAnswer = () => {
    return pickRandomElement(dictionary);
  };

  const initializeGame = () => {
    setCorrectAnswer("");
    setWrongGuesses(0);
    setUsedLetters([]);
    setGameEnded(false);
    setOutcome("");
    setKeys([]);
  };
  if (!correctAnswer) {
    const randomCorrectAnswer = pickRandomCorrectAnswer();
    setCorrectAnswer(randomCorrectAnswer);
    setUsedLetters([randomCorrectAnswer[0], randomCorrectAnswer[randomCorrectAnswer.length - 1]]);
    const letterCount = randomCorrectAnswer.length * 2 < 12 ? 12 : randomCorrectAnswer.length * 2;
    const strippedCorrectAnswer = [...randomCorrectAnswer].filter(
      (letter) => letter !== randomCorrectAnswer[0] && letter !== randomCorrectAnswer[randomCorrectAnswer.length - 1]
    );
    const allowedLetters = allLetters.filter(
      (letter) => letter !== randomCorrectAnswer[0] && letter !== randomCorrectAnswer[randomCorrectAnswer.length - 1]
    );
    const letterSet = new Set(strippedCorrectAnswer);

    while (letterSet.size < letterCount && letterSet.size < allLetters.length - 1) {
      letterSet.add(pickRandomElement(allowedLetters));
    }
    setKeys(shuffleArray(Array.from(letterSet)));
  }

  useEffect(() => {
    if (wrongGuesses === 6) {
      setOutcome("loss");
      setGameEnded(true);
    }
  }, [wrongGuesses, correctAnswer,setOutcome]);

  return (
    <div className="game-container">
      <GameEndModal
        outcome={outcome}
        isOpen={gameEnded}
        initializeGame={initializeGame}
        correctAnswer={correctAnswer}
      />
      <Header />
      <GameContext.Provider value={{ correctAnswer, wrongGuesses, usedLetters, gameEnded, setGameEnded, setOutcome }}>
        <Gallow />
        <GameProgress className={"w-100 h-100 m-2"} />
        <WordToGuess />
        <Keyboard handleLetterUsed={addUsedLetters} keys={keys} />
      </GameContext.Provider>
    </div>
  );
};

export default GameContainer;
