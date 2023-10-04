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
// TODO: Rename Confirmation Modal or make more general
import ConfirmationModal from "../components/ConfirmationModal";
import { removeCardSet, insertCardSet } from "../database";
import CreateSetFormModal from "../components/forms/CreateSetFormModal";

// TODO: Add set functionality
// TODO: How to trigger refetch after set removal or addition?
const Home = () => {
  const navigation = useNavigation();
  const [cardSets, setCardSets] = useState([]);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [addSetModalVisible, setAddSetModalVisible] = useState(false);
  const [selectedSetId, setSelectedSetId] = useState(null);

  // TODO: Write refetch card sets function
  useEffect(() => {
    // Fetch card sets from the database
    fetchCardSets((data) => {
      console.log("Fetched these sets: ", data);
      setCardSets(data);
    });
  }, []);

  // Removing set card logic
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

  // Adding set card logic
  const submitSetCardCreation = (formData) => {
    insertCardSet(formData, () => {
      setAddSetModalVisible(false);
      fetchCardSets((data) => {
        console.log("Fetched these sets: ", data);
        setCardSets(data);
      });
    });
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
    addButton: {
      // TODO: Add Button basic styling
    },
  });

  return (
    <View>
      <Button
        title="Add new Set"
        style={styles.addButton}
        onPress={() => setAddSetModalVisible(true)}
      ></Button>
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
      <CreateSetFormModal
        isVisible={addSetModalVisible}
        onSubmit={submitSetCardCreation}
      ></CreateSetFormModal>
    </View>
  );
};

export default Home;
