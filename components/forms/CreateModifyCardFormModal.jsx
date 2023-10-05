import { Text, TextInput, Button, Modal } from "react-native";
import { useForm, Controller } from "react-hook-form";
import React, { useEffect } from "react";

const CreateModifyCardFormModal = ({
  isVisible,
  onSubmit,
  existingSetMetaData,
  onCancel,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  useEffect(() => {
    reset(existingSetMetaData);
  }, [existingSetMetaData]);

  const handleCardCreationModificationSubmit = (data) => {
    onSubmit(data, () => reset());
  };

  return (
    <Modal visible={isVisible}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Question"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="question"
      />
      {errors.question && <Text>This field is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Answer"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="answer"
      />
      {errors.answer && <Text>This field is required.</Text>}
      <Button
        title="Submit"
        onPress={handleSubmit(handleCardCreationModificationSubmit)}
      />
      <Button
        title="Cancel"
        onPress={() => {
          reset();
          onCancel();
        }}
      />
    </Modal>
  );
};

export default CreateModifyCardFormModal;
