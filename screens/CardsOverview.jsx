import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  fetchCardsBySet,
  removeCard,
  updateCard,
  insertCard,
} from "../database";
import { useNavigation } from "@react-navigation/native";
import Card from "../components/Card";
import { AntDesign } from "@expo/vector-icons";
import CreateModifyEntityModal from "../components/modals/CreateModifyEntityModal";
import RemoveEntityModal from "../components/modals/RemoveEntityModal";

const CardsOverview = ({ route }) => {
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
      cardContent={<Text style={styles.questionStyle}>{item.question}</Text>}
      onModify={() => handleCardModification(item.id)}
      onRemove={() => handleCardRemoval(item.id)}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <RemoveEntityModal
        isVisible={removeModalVisible}
        cancelEntityRemoval={cancelCardAction}
        confirmEntityRemoval={confirmCardRemoval}
      />
      <CreateModifyEntityModal
        isVisible={modifiyModalVisible}
        onSubmit={submitCardModification}
        existingEntityMetaData={cards.find(
          (cardSet) => cardSet.id === selectedCardId
        )}
        onCancel={cancelCardAction}
      />
      <CreateModifyEntityModal
        entity="Card"
        isVisible={addCardModalVisible}
        onSubmit={submitCardCreation}
        onCancel={cancelCardAction}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.sessionButton}
          onPress={() => navigation.navigate("Session", { id, cards })}
        >
          <AntDesign name="play" size={24} color="white" />
          <Text style={styles.addButtonText}>Start Session</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setAddCardModalVisible(true)}
        >
          <AntDesign name="pluscircleo" size={24} color="white" />
          <Text style={styles.addButtonText}>Add New Card</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={cards}
        numColumns={1}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  questionStyle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "blue",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center", // Center horizontally
    marginTop: 16, // Margin at the top of the screen
    marginBottom: 16,
    paddingVertical: 10, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 5,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10, // Margin between icon and text
  },
  sessionButton: {
    backgroundColor: "forestgreen",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center", // Center horizontally
    marginTop: 16, // Margin at the top of the screen
    marginBottom: 16,
    paddingVertical: 10, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    margin: 8,
    gap: 4,
  },
});

export default CardsOverview;
