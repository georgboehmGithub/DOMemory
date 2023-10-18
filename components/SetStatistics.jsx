import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "../ThemeContext";
import { LIGHT_THEME, DARK_THEME } from "../themes";
import EntityActionModal from "./modals/EntityActionModal";
import { fetchCardSetById, resetSetProgress } from "../database";

const SetStatistics = ({ cardSetId, data }) => {
  const { theme } = useTheme(); // Use the useTheme hook
  const usedTheme = theme === "light" ? LIGHT_THEME : DARK_THEME;
  // Display only the last 10 values from the 'data' array
  const [displayedValues, setDisplayedValues] = useState(data.slice(-10));
  const [modalVisible, setModalVisible] = useState(false);
  const [cardSet, setCardSet] = useState(null);

  // TODOS: DELETE PB ALSO IN SET TABLE
  console.log("cardSet: ", cardSet);
  useEffect(() => {
    fetchCardSetById(cardSetId, (cardSet) => {
      setCardSet(cardSet[0]);
    });
  }, [cardSetId]);

  // Calculate the maximum value in the data for scaling
  const maxDataValue = Math.max(...displayedValues);

  console.log("data: ", data);
  console.log("displayedValues: ", displayedValues);

  const handleResetProgress = (setId) => {
    // Reset progress
    resetSetProgress(setId, () => {
      setDisplayedValues([0]);
      setModalVisible(false);
    });
  };

  return (
    <View style={usedTheme.STATS.container}>
      <View>
        {cardSet && <Text style={usedTheme.STATS.title}>{cardSet.title}</Text>}
      </View>
      <View style={usedTheme.STATS.chartContainer}>
        {displayedValues.map((value, index) => (
          <View
            key={index}
            style={[
              styles.dataPoint,
              {
                height:
                  maxDataValue !== 0
                    ? (value + 0.01 / maxDataValue) * 150
                    : 0.01 * 150, // Adjust the height based on data value
              },
            ]}
          />
        ))}
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
        <EntityActionModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onRemove={() => handleResetProgress(cardSetId)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dataPoint: {
    width: 20,
    marginBottom: 5,
    backgroundColor: "black",
    borderRadius: 40,
  },
});

export default SetStatistics;
