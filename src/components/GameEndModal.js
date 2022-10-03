import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const GameEndModal = ({ isOpen, outcome, initializeGame, correctAnswer }) => {
  const displayMessage = outcome === "win" ? "Congratulations!" : "Game Over!";

  const newGame = () => {
    initializeGame();
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>{displayMessage}</ModalHeader>
      {outcome === "loss" && <ModalBody>{`The word was "${correctAnswer}".`}</ModalBody>}
      <ModalFooter>
        <Button color="success" onClick={newGame}>
          Play again
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default GameEndModal;
