import { Modal, Button, View, Text } from "react-native";
import React from "react";

const GenericModal = ({ isVisible, onConfirm, onCancel, title, children }) => {
  return (
    <Modal visible={isVisible}>
      <View>
        <Text>{title}</Text>
        {children}
      </View>
      <Button title="Confirm" onPress={onConfirm} />
      <Button title="Cancel" onPress={onCancel} />
    </Modal>
  );
};

export default GenericModal;
