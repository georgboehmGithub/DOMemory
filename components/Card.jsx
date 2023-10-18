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
import { useTheme } from "../ThemeContext";
import { LIGHT_THEME, DARK_THEME } from "../themes";

const Card = ({ cardContent, onRemove, onModify, alignTextCenter = false }) => {
  const { theme } = useTheme(); // Use the useTheme hook
  const usedTheme = theme === "light" ? LIGHT_THEME : DARK_THEME;
  const [modalVisible, setModalVisible] = useState(false);

  const styles = StyleSheet.create({
    actionButtonContainer: {
      alignItems: "flex-end",
    },
    buttonContainer: {
      flexDirection: "row",
      gap: 4,
    },
    textContainer: {
      flex: 1,
      paddingRight: 8,
      alignItems: alignTextCenter ? "center" : "flex-start",
    },
  });

  return (
    <Pressable style={usedTheme.CARDOVERVIEW.CARD.cardContainer}>
      <View style={styles.textContainer}>
        <Text
          numberOfLines={onRemove && onModify ? 1 : 0} // Conditionally set the numberOfLines
          ellipsizeMode={onRemove && onModify ? "tail" : "clip"} // Conditionally set ellipsizeMode
          style={usedTheme.CARDOVERVIEW.CARD.text}
        >
          {cardContent}
        </Text>
      </View>
      {onRemove && onModify && (
        <TouchableOpacity
          style={styles.actionButtonContainer}
          onPress={() => setModalVisible(true)}
        >
          <AntDesign
            name="ellipsis1"
            size={30}
            color={usedTheme.CARDOVERVIEW.CARD.settingsIcon.color}
          />
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
