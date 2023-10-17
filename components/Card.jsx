import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  Button,
  View,
  TouchableOpacity,
} from "react-native";
import EntityActionModal from "./modals/EntityActionModal";
import { AntDesign } from "@expo/vector-icons";

const Card = ({ cardContent, onRemove, onModify, alignTextCenter = false }) => {
  const styles = StyleSheet.create({
    actionButtonContainer: {
      alignItems: "flex-end",
    },
    cardContainer: {
      padding: 16,
      margin: 8,
      width: "95%",
      borderRadius: 10,
      borderColor: "grey",
      alignItems: "center", // Center horizontally by default
      backgroundColor: "#FFFFFF",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      flex: 1,
      flexDirection: "row",
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      justifyContent: "space-between",
    },
    buttonContainer: {
      flexDirection: "row",
      gap: 4,
    },
    textContainer: {
      flex: 1,
      paddingRight: 8,
      alignItems: alignTextCenter ? "center" : "flex-start", // Conditionally align text center
    },
  });

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Pressable style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail">
          {cardContent}
        </Text>
      </View>
      {onRemove && onModify && (
        <TouchableOpacity
          style={styles.actionButtonContainer}
          onPress={() => setModalVisible(true)}
        >
          <AntDesign name="ellipsis1" size={30} color="black" />
        </TouchableOpacity>
      )}
      <EntityActionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onRemove={onRemove}
        onModify={onModify}
      />
    </Pressable>
  );
};

export default Card;
