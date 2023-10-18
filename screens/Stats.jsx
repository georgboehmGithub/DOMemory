import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { fetchPersonalBests } from "../database";
import SetStatistics from "../components/SetStatistics";
import { useTheme } from "../ThemeContext";
import { LIGHT_THEME, DARK_THEME } from "../themes";

const Stats = () => {
  const [personalBestsBySetId, setPersonalBestsBySetId] = useState([]);
  const { theme } = useTheme(); // Use the useTheme hook
  const usedTheme = theme === "light" ? LIGHT_THEME : DARK_THEME;

  useEffect(() => {
    fetchPersonalBests((personalBestsData) => {
      const personalBestsMapped = personalBestsData.reduce((acc, entry) => {
        const { card_set_id, personal_best } = entry;
        const existingEntry = acc.find(
          (item) => item.card_set_id === card_set_id
        );
        if (existingEntry) {
          existingEntry.personal_bests.push(personal_best);
        } else {
          acc.push({ card_set_id, personal_bests: [personal_best] });
        }
        return acc;
      }, []);

      setPersonalBestsBySetId(personalBestsMapped);
    });
  }, []);

  console.log("personalBestsBySetId: ", personalBestsBySetId);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: usedTheme.background,
      }}
    >
      <FlatList
        data={personalBestsBySetId}
        numColumns={1}
        renderItem={({ item }) => (
          <SetStatistics
            data={item.personal_bests}
            cardSetId={item.card_set_id}
            key={item.card_set_id.toString()}
          />
        )}
        keyExtractor={(item) => item.card_set_id.toString()}
      />
    </View>
  );
};

export default Stats;
