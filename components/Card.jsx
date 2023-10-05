import { Text, StyleSheet, Pressable, Button } from "react-native";

const Card = ({ cardContent, onRemove, onModify }) => {
  const styles = StyleSheet.create({
    cardContainer: {
      margin: 8,
      padding: 16,
      width: "80%",
      borderWidth: 1,
      borderColor: "grey",
    },
  });
  return (
    <Pressable style={styles.cardContainer}>
      <Text>{cardContent}</Text>
      {onRemove && <Button title={"Remove"} onPress={onRemove} />}
      {onModify && <Button title={"Modify"} onPress={onModify} />}
    </Pressable>
  );
};

export default Card;
