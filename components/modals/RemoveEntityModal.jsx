import { Modal, View, StyleSheet, Text, Button } from "react-native";

const RemoveEntityModal = ({
  isVisible,
  confirmEntityRemoval,
  cancelEntityRemoval,
}) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalView}>
        <Text>Are you sure you want to remove this entity?</Text>
        <View style={styles.buttonRow}>
          <Button
            title="Cancel"
            color="crimson"
            onPress={cancelEntityRemoval}
          />
          <Button title="Yes" color="navy" onPress={confirmEntityRemoval} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    marginTop: 160,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    height: 300,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 60,
  },
});

export default RemoveEntityModal;
