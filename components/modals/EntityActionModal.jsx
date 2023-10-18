import React from "react";
import { Modal, Text, View, Button } from "react-native";

const EntityActionModal = ({ visible, onClose, onRemove, onModify }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ backgroundColor: "white", padding: 20 }}>
          <Text>Options</Text>
          {onRemove && (
            <Button title="Remove" color="crimson" onPress={onRemove} />
          )}
          {onModify && (
            <Button title="Modify" color="navy" onPress={onModify} />
          )}
          <Button title="Cancel" onPress={onClose}></Button>
        </View>
      </View>
    </Modal>
  );
};

export default EntityActionModal;
