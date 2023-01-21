import React, { useContext } from "react";
import { GameContext } from "./GameContainer";
import '../styles/Gallow.css'

function Gallow() {
  const { wrongGuesses } = useContext(GameContext);
  return <img className="gallow" alt="gallow" src={require(`../assets/stage${wrongGuesses}.png`)} />;
}

export default Gallow;
