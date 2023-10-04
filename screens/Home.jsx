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
import ConfirmationModal from "../components/ConfirmationModal";
import { removeCardSet } from "../database";

// TODO: Add set functionality
// TODO: How to trigger refetch after set removal or addition?
const Home = () => {
  const navigation = useNavigation();
  const [cardSets, setCardSets] = useState([]);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [selectedSetId, setSelectedSetId] = useState(null);

  useEffect(() => {
    // Fetch card sets from the database
    fetchCardSets((data) => {
      setCardSets(data);
    });
  }, []);

  const confirmSetCardRemoval = () => {
    removeCardSet(selectedSetId, () => {
      // Callback function to fetch card sets again after removal
      fetchCardSets((data) => {
        setCardSets(data);
      });
    });
    setRemoveModalVisible(false);
    setSelectedSetId(null);
  };

  const cancelSetCardRemoval = () => {
    setRemoveModalVisible(false);
    setSelectedSetId(null);
  };

  const handleSetCardRemoval = (itemId) => {
    setSelectedSetId(itemId);
    setRemoveModalVisible(true);
  };

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
      <Button
        title="remove"
        onPress={() => handleSetCardRemoval(item.id)}
      ></Button>
    </Pressable>
  );

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
      <ConfirmationModal
        isVisible={removeModalVisible}
        confirmRemove={confirmSetCardRemoval}
        cancelRemove={cancelSetCardRemoval}
      ></ConfirmationModal>
    </View>
  );
};

export default Home;
