import { Text, TextInput, Button, Modal } from "react-native";
import { useForm, Controller } from "react-hook-form";
import React, { useEffect } from "react";

const CreateModifySetFormModal = ({
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
      title: "",
      group_name: "",
      numCards: "",
      personalBest: "",
    },
  });

  useEffect(() => {
    reset(existingSetMetaData);
  }, [existingSetMetaData]);

  const handleCardCreatioModificationSubmit = (data) => {
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
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="title"
      />
      {errors.title && <Text>This field is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Group Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="group_name"
      />
      {errors.group_name && <Text>This field is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^\d+$/, // Validate that it's a number
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Number of Cards"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value.toString()}
          />
        )}
        name="numCards"
      />
      {errors.numCards && (
        <Text>This field is required and should be a number.</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[0-9]*\.?[0-9]+$/, // Validate that it's a decimal number
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Personal Best"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value.toString()}
          />
        )}
        name="personalBest"
      />
      {errors.personalBest && (
        <Text>This field is required and should be a decimal number.</Text>
      )}
      <Button
        title="Submit"
        onPress={handleSubmit(handleCardCreatioModificationSubmit)}
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

export default CreateModifySetFormModal;
