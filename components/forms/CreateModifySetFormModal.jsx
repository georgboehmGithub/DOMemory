import React, { useEffect } from "react";
import { Text, TextInput, Button, Modal, View, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

const CreateModifySetFormModal = ({
  isVisible,
  onSubmit,
  existingSetMetaData,
  onCancel,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      group_name: "",
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ title: "", group_name: "" });
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    reset(existingSetMetaData);
  }, [existingSetMetaData, reset]);

  const handleSetCreationModificationSubmit = (data) => {
    onSubmit(data, () => {});
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="title"
        />
        {errors.title && (
          <Text style={styles.errorText}>Title is required.</Text>
        )}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Group Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="group_name"
        />
        {errors.group_name && (
          <Text style={styles.errorText}>Group name is required.</Text>
        )}
        <View style={styles.buttonRow}>
          <Button
            title="Cancel"
            color="firebrick"
            onPress={() => {
              reset();
              onCancel();
            }}
          />
          <Button
            title="Submit"
            color="skyblue"
            onPress={handleSubmit(handleSetCreationModificationSubmit)}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 20,
    marginTop: 160,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20, // Reduce padding for a cleaner look
    minHeight: 200, // Adjust the minimum height as needed
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%", // Ensure the buttons take up the full width
    marginTop: 60, // Adjust the top margin as needed
  },
});

export default CreateModifySetFormModal;
