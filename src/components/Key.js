import { React, useContext } from "react";
import { Button } from "reactstrap";
import { GameContext } from "./GameContainer";
import "../styles/Keyboard.css";

const Key = ({ letter, handleLetterUsed }) => {
  const { gameEnded, usedLetters } = useContext(GameContext);

  const handleClick = () => {
    handleLetterUsed(letter);
  };

  return (
    <Button
      className="keyboard-key"
      color={usedLetters.includes(letter) ? "secondary" : "success"}
      disabled={gameEnded || usedLetters.includes(letter)}
      onClick={handleClick}
    >
      {letter && letter.toUpperCase()}
    </Button>
  );
};

export default Key;
