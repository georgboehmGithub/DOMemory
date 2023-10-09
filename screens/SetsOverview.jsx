import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { fetchCardSets } from "../database";
import { removeCardSet, insertCardSet, updateCardSet } from "../database";
import CreateModifyEntityModal from "../components/modals/CreateModifyEntityModal";
import { AntDesign } from "@expo/vector-icons";
import RemoveEntityModal from "../components/modals/RemoveEntityModal";

const SetsOverview = ({ route }) => {
  const { isSetDatabaseInitialized } = route.params;
  const navigation = useNavigation();
  const [cardSets, setCardSets] = useState([]);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [addSetModalVisible, setAddSetModalVisible] = useState(false);
  const [modifySetModalVisible, setModifySetModalVisible] = useState(false);
  const [selectedSetId, setSelectedSetId] = useState(null);

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
    <Pressable
      style={styles.cardContainer}
      onPress={() => navigation.navigate("CardsOverview", item)}
    >
      <Text style={styles.titleText}>{item.title}</Text>
      <Text style={styles.groupNameText}>{item.group_name}</Text>
      <View style={styles.detailSection}>
        <View style={styles.bottomRow}>
          <Text style={styles.numCardsText}>{item.numCards} Cards</Text>
          <Text style={styles.personalBestText}>
            {item.personalBest * 100}%
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Remove"
          color="crimson"
          onPress={() => {
            handleSetCardRemoval(item.id);
          }}
        />
        <Button
          title="Modify"
          color="navy"
          borderWidth=""
          onPress={() => {
            handleSetCardModification(item.id);
          }}
        />
      </View>
    </Pressable>
  );

  const styles = StyleSheet.create({
    cardContainer: {
      marginLeft: 10,
      margin: 8,
      padding: 16,
      width: "45%",
      borderRadius: 10,
      backgroundColor: "#FFFFFF",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5, // For Android
    },
    titleText: {
      fontSize: 18,
      fontWeight: "bold",
    },
    groupNameText: {
      fontSize: 16,
      color: "gray",
    },
    bottomRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    detailSection: {
      marginTop: 80,
    },
    numCardsText: {
      fontSize: 14,
      fontWeight: "bold",
    },
    personalBestText: {
      fontSize: 14,
      color: "green",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 8,
      gap: 6,
    },
    addButton: {
      backgroundColor: "blue",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      marginTop: 16,
      marginBottom: 16,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    addButtonText: {
      color: "white",
      fontSize: 16,
      marginLeft: 10,
    },
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
        style={styles.addButton}
        onPress={() => setAddSetModalVisible(true)}
      >
        <AntDesign name="pluscircleo" size={24} color="white" />
        <Text style={styles.addButtonText}>Add New Set</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.setContainer}
        data={cardSets}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default SetsOverview;
