import { Modal, Button } from "react-native";

const ConfirmationModal = ({ confirmRemove, cancelRemove, isVisible }) => {
  return (
    <Modal visible={isVisible}>
      {/* <Text>Are you sure you want to remove this entity?</Text> */}
      <Button title="Confirm" onPress={confirmRemove} />
      <Button title="Cancel" onPress={cancelRemove} />
    </Modal>
  );
};

export default ConfirmationModal;
