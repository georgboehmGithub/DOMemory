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
import { useTheme } from "../ThemeContext";
import { LIGHT_THEME, DARK_THEME } from "../themes";

const Set = ({ item, onRemove, onModify }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { isDarkMode, toggleTheme, theme } = useTheme(); // Use the useTheme hook
  const usedTheme = theme === "light" ? LIGHT_THEME : DARK_THEME;

  return (
    <Pressable
      style={usedTheme.SETOVERVIEW.SET.container}
      onPress={() => navigation.navigate("CardsOverview", item)}
    >
      <Text style={usedTheme.SETOVERVIEW.SET.title}>{item.title}</Text>
      <Text style={usedTheme.SETOVERVIEW.SET.groupNameText}>
        {item.group_name}
      </Text>
      <View style={usedTheme.SETOVERVIEW.SET.descriptionContainer}>
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={usedTheme.SETOVERVIEW.SET.descriptionText}
        >
          {item.description}
        </Text>
      </View>

      <View style={styles.detailSection}>
        <View style={styles.bottomRow}>
          <Text style={usedTheme.SETOVERVIEW.SET.numCardsText}>
            {item.numCards} Cards
          </Text>
          <Text style={usedTheme.SETOVERVIEW.SET.personalBestText}>
            {item.personalBest * 100}%
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.actionButtonContainer}
        onPress={() => setModalVisible(true)}
      >
        <AntDesign
          name="ellipsis1"
          size={30}
          color={usedTheme.SETOVERVIEW.SET.settingIcon.color}
        />
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
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailSection: {
    marginTop: 40,
  },
});

export default Set;
