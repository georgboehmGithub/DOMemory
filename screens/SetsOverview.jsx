import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";

import { fetchCardSets } from "../database";
import { removeCardSet, insertCardSet, updateCardSet } from "../database";
import CreateModifyEntityModal from "../components/modals/CreateModifyEntityModal";
import { AntDesign } from "@expo/vector-icons";
import RemoveEntityModal from "../components/modals/RemoveEntityModal";
import Set from "../components/Set";
import { useTheme } from "../ThemeContext";
import { LIGHT_THEME, DARK_THEME } from "../themes";

const SetsOverview = ({ route }) => {
  const { isSetDatabaseInitialized } = route.params;
  const [cardSets, setCardSets] = useState([]);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [addSetModalVisible, setAddSetModalVisible] = useState(false);
  const [modifySetModalVisible, setModifySetModalVisible] = useState(false);
  const [selectedSetId, setSelectedSetId] = useState(null);

  const { theme } = useTheme(); // Use the useTheme hook
  const usedTheme = theme === "light" ? LIGHT_THEME : DARK_THEME;

  useEffect(() => {
    // Fetch card sets from the database
    fetchCardSets((data) => {
      setCardSets(data);
    });
  }, [isSetDatabaseInitialized]);

  /**
   * Removing set card logic
   */
  const confirmSetCardRemoval = () => {
    removeCardSet(selectedSetId, () => {
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
    <Set
      item={item}
      onRemove={() => handleSetCardRemoval(item.id)}
      onModify={() => handleSetCardModification(item.id)}
    />
  );

  return (
    <View style={usedTheme.SETOVERVIEW.container}>
      <RemoveEntityModal
        isVisible={removeModalVisible}
        cancelEntityRemoval={cancelSetCardAction}
        confirmEntityRemoval={confirmSetCardRemoval}
      />
      <CreateModifyEntityModal
        entity="Set"
        isVisible={addSetModalVisible}
        onSubmit={submitSetCardCreation}
        onCancel={cancelSetCardAction}
      />
      <CreateModifyEntityModal
        entity="Set"
        isVisible={modifySetModalVisible}
        onSubmit={submitSetCardModification}
        existingEntityMetaData={cardSets.find(
          (cardSet) => cardSet.id === selectedSetId
        )}
        onCancel={cancelSetCardAction}
      />
      <TouchableOpacity
        style={usedTheme.SETOVERVIEW.addSetButton}
        onPress={() => setAddSetModalVisible(true)}
      >
        <AntDesign
          color={usedTheme.SETOVERVIEW.addSetButtonIcon.color}
          name="pluscircle"
          size={24}
        />
        <Text style={usedTheme.SETOVERVIEW.addSetButtonText}>Add New Set</Text>
      </TouchableOpacity>
      <FlatList
        data={cardSets}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default SetsOverview;
