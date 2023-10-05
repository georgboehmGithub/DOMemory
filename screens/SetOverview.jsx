import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Button,
} from "react-native";
import {
  fetchCardsBySet,
  removeCard,
  updateCard,
  insertCard,
} from "../database";
import ConfirmationModal from "../components/ConfirmationModal";
import CreateModifyCardFormModal from "../components/forms/CreateModifyCardFormModal";

const SetOverview = ({ route }) => {
  const { id, title, group, numCards, personalBest } = route.params;
  const [cards, setCards] = useState([]);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [addCardModalVisible, setAddCardModalVisible] = useState(false);
  const [modifiyModalVisible, setModifyModalVisible] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  // console.log("received item in set overview: ", route.params);
  useEffect(() => {
    fetchCardsBySet(id, (data) => {
      setCards(data);
    });
  }, []);

  // TODO: When removing or adding cards, update numCards for that set

  /**
   * Removing card logic
   */
  const confirmCardRemoval = () => {
    removeCard(id, selectedCardId, () => {
      fetchCardsBySet(id, (data) => {
        setCards(data);
      });
    });
    setRemoveModalVisible(false);
    setSelectedCardId(null);
  };

  const handleCardRemoval = (cardId) => {
    setRemoveModalVisible(true);
    setSelectedCardId(cardId);
  };

  /**
   * Adding card logic
   */
  const submitCardCreation = (formData) => {
    insertCard(id, formData, () => {
      setAddCardModalVisible(false);
      fetchCardsBySet(id, (data) => {
        console.log("Fetched these cards: ", data);
        setCards(data);
        setSelectedCardId(null);
      });
    });
  };

  /**
   * Modifying card logic
   */
  const submitCardModification = (formData) => {
    updateCard(selectedCardId, formData, () => {
      setModifyModalVisible(false);
      fetchCardsBySet(id, (data) => {
        console.log("Fetched these cards: ", data);
        setCards(data);
        setSelectedCardId(null);
      });
    });
  };

  const handleCardModification = (cardId) => {
    setModifyModalVisible(true);
    setSelectedCardId(cardId);
  };

  /**
   * Cancel any modal action
   */
  const cancelCardAction = () => {
    setRemoveModalVisible(false);
    setAddCardModalVisible(false);
    setModifyModalVisible(false);
    setSelectedCardId(null);
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.cardContainer}
      // onPress={() => navigation.navigate("SetOverview", item)}
    >
      <Text>
        {item.id + " | "}
        {item.question + " | "}
        {item.answer + " | "}
      </Text>
      <Button title={"Remove"} onPress={() => handleCardRemoval(item.id)} />
      <Button
        title={"Modify"}
        onPress={() => handleCardModification(item.id)}
      />
    </Pressable>
  );

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
    <View>
      <Button
        title="Add new Card"
        style={styles.addButton}
        onPress={() => setAddCardModalVisible(true)}
      />
      <FlatList
        data={cards}
        numColumns={1}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <ConfirmationModal
        isVisible={removeModalVisible}
        confirmRemove={confirmCardRemoval}
        onCancel={cancelCardAction}
      />
      <CreateModifyCardFormModal
        isVisible={addCardModalVisible}
        onSubmit={submitCardCreation}
        onCancel={cancelCardAction}
      />
      <CreateModifyCardFormModal
        isVisible={modifiyModalVisible}
        onSubmit={submitCardModification}
        existingSetMetaData={cards.find(
          (cardSet) => cardSet.id === selectedCardId
        )}
        onCancel={cancelCardAction}
      />
    </View>
  );
};

export default SetOverview;
