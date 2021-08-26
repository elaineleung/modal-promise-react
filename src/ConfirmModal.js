import React, { useEffect } from "react";
import useConfirm from "./useConfirm";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ConfirmModal = () => {
  const { prompt = "", isOpen = false, proceed, cancel } = useConfirm();

  useEffect(() => {
    const handleKeydown = (e) => {
      if (proceed && isOpen && e.key === "Enter") {
        proceed();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [proceed, isOpen]);

  return (
    <Modal isOpen={isOpen} toggle={cancel} fade>
      <ModalHeader>Confirm</ModalHeader>
      <ModalBody>{prompt}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={proceed} className="ml-4">
          Ok
        </Button>
        <Button color="secondary" onClick={cancel}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmModal;
