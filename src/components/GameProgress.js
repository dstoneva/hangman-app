import React, { useContext, useEffect, useState } from "react";
import { Progress } from "reactstrap";
import { GameContext } from "./GameContainer";

function GameProgress({ value, className }) {
  const { wrongGuesses } = useContext(GameContext);
  const [color, setColor] = useState("success");
  useEffect(() => {
    if (wrongGuesses >= 4) {
      setColor("danger");
    } else if (wrongGuesses > 1 && wrongGuesses < 4) {
      setColor("warning");
    } else {
      setColor("success");
    }
  }, [wrongGuesses]);

  return (
    <>
      <div className="text-center">Lives:</div>
      <Progress value={6 - wrongGuesses} color={color} className={className} max={6}>
        {6 - wrongGuesses} / 6
      </Progress>
    </>
  );
}

export default GameProgress;
