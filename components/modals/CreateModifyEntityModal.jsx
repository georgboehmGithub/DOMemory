import { Text, TextInput, Button, Modal, StyleSheet, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import React, { useEffect } from "react";

const getDefaultValuesForEntity = (entity) => {
  return entity === "Card"
    ? {
        // Card
        question: "",
        answer: "",
      }
    : {
        // Set
        title: "",
        group_name: "",
        description: "",
      };
};

const CreateModifyEntityModal = ({
  entity = "Card",
  isVisible,
  onSubmit,
  existingEntityMetaData,
  onCancel,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    defaultValues: getDefaultValuesForEntity(entity),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(getDefaultValuesForEntity(entity));
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    reset(existingEntityMetaData);
  }, [existingEntityMetaData, reset]);

  const handleEntityCreationModificationSubmit = (data) => {
    onSubmit(data, () => reset());
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
              placeholder={entity === "Card" ? "Question" : "Title"}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name={entity === "Card" ? "question" : "title"}
        />
        {errors.question && <Text>This field is required.</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder={entity === "Card" ? "Answer" : "Group name"}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          )}
          name={entity === "Card" ? "answer" : "group_name"}
        />
        {errors.answer && <Text>This field is required.</Text>}
        {entity === "Set" && (
          <>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder={"Description"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                />
              )}
              name={"description"}
            />
            {errors.description && <Text>This field is required.</Text>}
          </>
        )}
        <View style={styles.buttonRow}>
          <Button
            title="Cancel"
            color="crimson"
            onPress={() => {
              reset();
              onCancel();
            }}
          />
          <Button
            title="Submit"
            color="navy"
            onPress={handleSubmit(handleEntityCreationModificationSubmit)}
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
    padding: 20,
    minHeight: 200,
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
    width: "100%",
    marginTop: 60,
  },
});

export default CreateModifyEntityModal;
