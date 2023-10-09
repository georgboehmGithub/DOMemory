import React from "react";
import { View } from "react-native";
import GenericModal from "./GenericModal";

const RemoveSetModal = ({ isVisible, onConfirm, onCancel, children }) => {
  return (
    <GenericModal
      isVisible={isVisible}
      onConfirm={onConfirm}
      onCancel={onCancel}
      title="Remove Set"
      content={{ children }}
    />
  );
};

export default RemoveSetModal;
