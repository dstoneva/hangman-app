import React, { useContext } from "react";
import { GameContext } from "./GameContainer";

function Gallow() {
  const { wrongGuesses } = useContext(GameContext);
  return <img src={require(`../assets/stage${wrongGuesses}.png`)} />;
}

export default Gallow;
