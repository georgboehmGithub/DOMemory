import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
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
import { useTheme } from "../ThemeContext";
import { LIGHT_THEME, DARK_THEME } from "../themes";

const CardsOverview = ({ route }) => {
  const { id } = route.params;
  const [cards, setCards] = useState([]);
  const navigation = useNavigation();
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [addCardModalVisible, setAddCardModalVisible] = useState(false);
  const [modifiyModalVisible, setModifyModalVisible] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const { theme } = useTheme();
  const usedTheme = theme === "light" ? LIGHT_THEME : DARK_THEME;

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
      cardContent={
        <Text style={usedTheme.CARDOVERVIEW.question}>{item.question}</Text>
      }
      onModify={() => handleCardModification(item.id)}
      onRemove={() => handleCardRemoval(item.id)}
    />
  );

  return (
    <View style={usedTheme.CARDOVERVIEW.container}>
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
      <View style={usedTheme.CARDOVERVIEW.buttonContainer}>
        <TouchableOpacity
          style={usedTheme.CARDOVERVIEW.sessionButton}
          onPress={() => navigation.navigate("Session", { id, cards })}
        >
          <AntDesign
            name="play"
            size={24}
            color={usedTheme.CARDOVERVIEW.buttonIcon.color}
          />
          <Text style={usedTheme.CARDOVERVIEW.addButtonText}>
            Start Session
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={usedTheme.CARDOVERVIEW.addButton}
          onPress={() => setAddCardModalVisible(true)}
        >
          <AntDesign
            name="pluscircleo"
            size={24}
            color={usedTheme.CARDOVERVIEW.buttonIcon.color}
          />
          <Text style={usedTheme.CARDOVERVIEW.addButtonText}>Add New Card</Text>
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
export default CardsOverview;
