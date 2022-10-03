import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "./GameContainer";
import "../styles/WordToGuess.css";

const WordToGuess = () => {
  const [wordProgress, setWordProgress] = useState("");

  const { correctAnswer, usedLetters, setGameEnded, setOutcome } = useContext(GameContext);

  useEffect(() => {
    correctAnswer.length > 0 && maskWord() === correctAnswer && setGameEnded(true);
    setWordProgress(maskWord());

    if (maskWord() === correctAnswer) {
      setOutcome("win");
      setGameEnded(true);
    }
  }, [usedLetters]);

  const maskWord = () => {
    let revealedLetters = "";
    [...correctAnswer].forEach((letter) => {
      return usedLetters.includes(letter) ? (revealedLetters += letter) : (revealedLetters += " _ ");
    });

    return revealedLetters;
  };

  return <div className="hidden-word">{wordProgress}</div>;
};

export default WordToGuess;
