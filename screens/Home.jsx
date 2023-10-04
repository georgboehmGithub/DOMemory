import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { fetchCardSets } from "../database";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("mydb.db");

// TODO: Set removal functionality
// TODO: Add set functionality
// TODO: How to trigger refetch after set removal or addition?
const Home = () => {
  const navigation = useNavigation();
  const [cardSets, setCardSets] = useState([]);

  useEffect(() => {
    // Fetch card sets from the database
    fetchCardSets((data) => {
      setCardSets(data);
    });
  }, []);

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.cardContainer}
      onPress={() => navigation.navigate("SetOverview", item)}
    >
      <Text>
        {item.title}
        {"\n"}
        {item.group_name}
        {"\n"}
        {item.numCards}
        {"\n"}
        {item.personalBest}
      </Text>
      <Button title="remove" onPress={() => handleRemove(item.id)}></Button>
    </Pressable>
  );

  const handleRemove = (id) => {
    // TODO: Implement logic to remove a card set from the database
  };

  const styles = StyleSheet.create({
    cardContainer: {
      margin: 8,
      padding: 16,
      width: "29%",
      borderWidth: 2,
      borderColor: "green",
    },
  });

  return (
    <View>
      <FlatList
        data={cardSets}
        numColumns={3}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      ></FlatList>
    </View>
  );
};

export default Home;
