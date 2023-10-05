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
      <Button
        title="Submit"
        onPress={handleSubmit(handleSetCreationModificationSubmit)}
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
