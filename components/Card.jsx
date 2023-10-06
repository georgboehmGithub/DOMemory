import React from "react";
import { Text, StyleSheet, Pressable, Button, View } from "react-native";

const Card = ({ cardContent, onRemove, onModify, alignTextCenter = false }) => {
  const styles = StyleSheet.create({
    cardContainer: {
      padding: 16,
      margin: 8,
      width: "95%",
      borderRadius: 10,
      borderColor: "grey",
      alignItems: "center", // Center horizontally by default
      backgroundColor: "#FFFFFF",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      flex: 1,
      flexDirection: "row",
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      justifyContent: "space-between",
    },
    buttonContainer: {
      flexDirection: "row",
      gap: 4,
    },
    textContainer: {
      flex: 1,
      paddingRight: 8,
      alignItems: alignTextCenter ? "center" : "flex-start", // Conditionally align text center
    },
  });

  return (
    <Pressable style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail">
          {cardContent}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {onRemove && (
          <Button color="firebrick" title={"Remove"} onPress={onRemove} />
        )}
        {onModify && (
          <Button color="skyblue" title={"Modify"} onPress={onModify} />
        )}
      </View>
    </Pressable>
  );
};

export default Card;
