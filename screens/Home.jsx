import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { fetchCardSets } from "../database";
import { removeCardSet, insertCardSet, updateCardSet } from "../database";
import CreateModifySetFormModal from "../components/forms/CreateModifySetFormModal";
import { AntDesign } from "@expo/vector-icons";

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
      onPress={() => navigation.navigate("SetOverview", item)}
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
          // style={styles.deleteButton}
          title="Remove"
          color="firebrick"
          onPress={() => {
            handleSetCardRemoval(item.id);
          }}
        />
        <Button
          // style={styles.modifyButton}
          title="Modify"
          color="skyblue"
          onPress={() => {
            handleSetCardModification(item.id);
          }}
        />
      </View>
    </Pressable>
  );

  // TODO: Export and clean house
  const styles = StyleSheet.create({
    cardContainer: {
      marginLeft: 10,
      margin: 8,
      padding: 16,
      width: "45%",
      borderRadius: 10,
      backgroundColor: "#FFFFFF", // Set a background color
      shadowColor: "#000", // Add a shadow
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5, // For Android
    },
    titleText: {
      fontSize: 18, // Adjust the font size as needed
      fontWeight: "bold", // Make the title bold
    },
    groupNameText: {
      fontSize: 16, // Adjust the font size as needed
      color: "gray", // Make the group name less emphasized
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
      fontSize: 14, // Adjust the font size as needed
      fontWeight: "bold", // Make the number of cards bold
    },
    personalBestText: {
      fontSize: 14, // Adjust the font size as needed
      color: "green", // Customize the color for personal best
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 8, // Adjust as needed for spacing
      gap: 6,
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
    modalView: {
      margin: 20,
      marginTop: 160,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      height: 300,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%", // Ensure the buttons take up the full width
      marginTop: 60, // Adjust the top margin as needed
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
      {/* TODO: Remove modal component */}
      <Modal
        visible={removeModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalView}>
          <Text>Are you sure you want to remove this set?</Text>
          <View style={styles.buttonRow}>
            <Button
              title="Cancel"
              color="firebrick"
              onPress={cancelSetCardAction}
            />
            <Button
              title="Yes"
              color="skyblue"
              onPress={confirmSetCardRemoval}
            />
          </View>
        </View>
      </Modal>
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

export default Home;
