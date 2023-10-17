import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import EntityActionModal from "./modals/EntityActionModal";

const Set = ({ item, onRemove, onModify }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Pressable
      style={styles.setContainer}
      onPress={() => navigation.navigate("CardsOverview", item)}
    >
      <Text style={styles.titleText}>{item.title}</Text>
      <Text style={styles.groupNameText}>{item.group_name}</Text>
      <View style={styles.descriptionContainer}>
        <Text numberOfLines={3} ellipsizeMode="tail">
          {item.description}
        </Text>
      </View>

      <View style={styles.detailSection}>
        <View style={styles.bottomRow}>
          <Text style={styles.numCardsText}>{item.numCards} Cards</Text>
          <Text style={styles.personalBestText}>
            {item.personalBest * 100}%
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.actionButtonContainer}
        onPress={() => setModalVisible(true)}
      >
        <AntDesign name="ellipsis1" size={30} color="black" />
      </TouchableOpacity>
      <EntityActionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onRemove={onRemove}
        onModify={onModify}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  actionButtonContainer: {
    alignItems: "flex-end",
  },
  setContainer: {
    marginLeft: 10,
    margin: 8,
    padding: 16,
    width: "45%",
    height: 230,
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
    marginTop: 40,
  },
  numCardsText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  personalBestText: {
    fontSize: 14,
    color: "green",
  },
  descriptionContainer: {
    flex: 1,
  },
});

export default Set;
