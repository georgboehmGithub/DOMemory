import React from "react";
import { Text, StyleSheet, Pressable, Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Set = ({ item, onRemove, onModify }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.cardContainer}
      onPress={() => navigation.navigate("CardsOverview", item)}
    >
      <Text style={styles.titleText}>{item.title}</Text>
      <Text style={styles.groupNameText}>{item.group_name}</Text>
      <View style={styles.descriptionContainer}>
        <Text numberOfLines={3} ellipsizeMode="tail">
          {item.description}
        </Text>
      </View>

      <View style={styles.detailSection}>
        <View style={styles.bottomRow}>
          <Text style={styles.numCardsText}>{item.numCards} Cards</Text>
          <Text style={styles.personalBestText}>
            {item.personalBest * 100}%
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Remove" color="crimson" onPress={onRemove} />
        <Button title="Modify" color="navy" borderWidth="" onPress={onModify} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: 10,
    margin: 8,
    padding: 16,
    width: "45%",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  groupNameText: {
    fontSize: 16,
    color: "gray",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailSection: {
    marginTop: 40,
  },
  numCardsText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  personalBestText: {
    fontSize: 14,
    color: "green",
  },
  descriptionContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
    gap: 6,
  },
});

export default Set;
