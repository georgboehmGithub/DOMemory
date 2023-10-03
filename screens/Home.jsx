import React from "react";
import {
  Text,
  View,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";

const Home = ({ navigation }) => {
  const CardSets = [
    { title: "Set1", group: "Frontend", numCards: 2, personalBest: 0.5 },
    { title: "Set2", group: "Frontend", numCards: 12, personalBest: 0.8 },
    { title: "Set3", group: "Backend", numCards: 4, personalBest: 0.75 },
    { title: "Set4", group: "General", numCards: 6, personalBest: 0.6 },
    { title: "Set5", group: "Frontend", numCards: 2, personalBest: 0.5 },
    { title: "Set6", group: "Frontend", numCards: 12, personalBest: 0.8 },
    { title: "Set7", group: "Backend", numCards: 4, personalBest: 0.75 },
    { title: "Set8", group: "General", numCards: 6, personalBest: 0.6 },
    { title: "Set9", group: "General", numCards: 6, personalBest: 0.6 },
    { title: "Set10", group: "General", numCards: 6, personalBest: 0.6 },
    { title: "Set11", group: "General", numCards: 6, personalBest: 0.6 },
    { title: "Set12", group: "General", numCards: 6, personalBest: 0.6 },
    { title: "Set13", group: "General", numCards: 6, personalBest: 0.6 },
    { title: "Set14", group: "General", numCards: 6, personalBest: 0.6 },
    { title: "Set15", group: "General", numCards: 6, personalBest: 0.6 },
  ];

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.cardContainer}
      onPress={() => navigation.navigate("Help")}
    >
      <Text>
        {item.title}
        {"\n"}
        {item.group}
        {"\n"}
        {item.numCards}
        {"\n"}
        {item.personalBest}
      </Text>
      <Button title="remove"></Button>
    </Pressable>
  );

  const styles = StyleSheet.create({
    cardContainer: {
      margin: 8,
      padding: 16,
      width: "29%",
      borderWidth: 2, // Add border width
      borderColor: "green", // Add border color
    },
  });

  return (
    <View>
      <FlatList
        data={CardSets}
        numColumns={3}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      ></FlatList>
    </View>
  );
};

export default Home;
