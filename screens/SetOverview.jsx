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
import { useNavigation } from "@react-navigation/native";
import ConfirmationModal from "../components/ConfirmationModal";
import CreateModifyCardFormModal from "../components/forms/CreateModifyCardFormModal";
import Card from "../components/Card";

// TODO: Namings for these components abysmal -> Pls update
const SetOverview = ({ route }) => {
  const { id, title, group, numCards, personalBest } = route.params;
  const [cards, setCards] = useState([]);
  const navigation = useNavigation();
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [addCardModalVisible, setAddCardModalVisible] = useState(false);
  const [modifiyModalVisible, setModifyModalVisible] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  useEffect(() => {
    fetchCardsBySet(id, (data) => {
      setCards(data);
    });
  }, []);

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
        // console.log("Fetched these cards: ", data);
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
        // console.log("Fetched these cards: ", data);
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
    <Card
      cardContent={
        <Text>
          {item.id + " | "}
          {item.question + " | "}
          {item.answer + " | "}
        </Text>
      }
      onModify={() => handleCardModification(item.id)}
      onRemove={() => handleCardRemoval(item.id)}
    />
  );

  return (
    <View>
      <Button
        title="Start session"
        onPress={() => navigation.navigate("Session", { id, cards })}
      />
      <Button
        title="Add new Card"
        // style={styles.addButton}
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
