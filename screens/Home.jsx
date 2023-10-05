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
import { removeCardSet, insertCardSet, updateCardSet } from "../database";
import CreateModifySetFormModal from "../components/forms/CreateModifySetFormModal";

const Home = ({ route }) => {
  const { isSetDatabaseInitialized } = route.params;
  const navigation = useNavigation();
  const [cardSets, setCardSets] = useState([]);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [addSetModalVisible, setAddSetModalVisible] = useState(false);
  const [modifySetModalVisible, setModifySetModalVisible] = useState(false);
  const [selectedSetId, setSelectedSetId] = useState(null);

  // TODO: Write refetch card sets function
  useEffect(() => {
    // Fetch card sets from the database
    fetchCardSets((data) => {
      // console.log("Fetched these sets: ", data);
      setCardSets(data);
    });
  }, [isSetDatabaseInitialized]);

  /**
   * Removing set card logic
   */
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

  const handleSetCardRemoval = (itemId) => {
    setSelectedSetId(itemId);
    setRemoveModalVisible(true);
  };

  /**
   * Adding set card logic
   */
  const submitSetCardCreation = (formData) => {
    insertCardSet(formData, () => {
      setAddSetModalVisible(false);
      fetchCardSets((data) => {
        // console.log("Fetched these sets: ", data);
        setCardSets(data);
        setSelectedSetId(null);
      });
    });
  };

  /**
   * Modify set card logic
   */
  const handleSetCardModification = (itemId) => {
    setSelectedSetId(itemId);
    setModifySetModalVisible(true);
  };

  const submitSetCardModification = (formData) => {
    updateCardSet(selectedSetId, formData, () => {
      setModifySetModalVisible(false);
      fetchCardSets((data) => {
        // console.log("Fetched these sets: ", data);
        setCardSets(data);
        setSelectedSetId(null);
      });
    });
  };

  /**
   * Cancel any modal action
   */
  const cancelSetCardAction = () => {
    setRemoveModalVisible(false);
    setAddSetModalVisible(false);
    setModifySetModalVisible(false);
    setSelectedSetId(null);
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.cardContainer}
      onPress={() => navigation.navigate("SetOverview", item)}
    >
      <Text>
        {`title: ${item.title}`}
        {"\n"}
        {`group name: ${item.group_name}`}
        {"\n"}
        {`numCards: ${item.numCards}`}
        {"\n"}
        {`personal best: ${item.personalBest}`}
      </Text>
      <Button
        style={styles.modifyDeleteButtons}
        title="remove"
        onPress={() => {
          handleSetCardRemoval(item.id);
        }}
      />
      <Text>--------------------------------------------</Text>
      <Button
        style={styles.modifyDeleteButtons}
        title="modify"
        onPress={() => {
          handleSetCardModification(item.id);
        }}
      />
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
    modifyDeleteButtons: {
      // marginBottom: 8,
      // margin: 8,
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
      />
      <FlatList
        data={cardSets}
        numColumns={3}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <ConfirmationModal
        isVisible={removeModalVisible}
        confirmRemove={confirmSetCardRemoval}
        onCancel={cancelSetCardAction}
      />
      <CreateModifySetFormModal
        isVisible={addSetModalVisible}
        onSubmit={submitSetCardCreation}
        onCancel={cancelSetCardAction}
      />
      <CreateModifySetFormModal
        isVisible={modifySetModalVisible}
        onSubmit={submitSetCardModification}
        existingSetMetaData={cardSets.find(
          (cardSet) => cardSet.id === selectedSetId
        )}
        onCancel={cancelSetCardAction}
      />
    </View>
  );
};

export default Home;
