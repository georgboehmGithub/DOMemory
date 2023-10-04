import { Modal, Button } from "react-native";

const ConfirmationModal = ({ confirmRemove, onCancel, isVisible }) => {
  return (
    <Modal visible={isVisible}>
      <Button title="Confirm" onPress={confirmRemove} />
      <Button title="Cancel" onPress={onCancel} />
    </Modal>
  );
};

export default ConfirmationModal;
