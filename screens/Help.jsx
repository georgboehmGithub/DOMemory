import React from "react";
import { View, FlatList } from "react-native";
import Description from "../components/Description";
import { useTheme } from "../ThemeContext";
import { LIGHT_THEME, DARK_THEME } from "../themes";

const Help = () => {
  const { theme } = useTheme();
  const usedTheme = theme === "light" ? LIGHT_THEME : DARK_THEME;
  const DUMMYDATA = [
    {
      title: "Sets",
      description:
        "In your application, sets are collections of related cards. These sets help you organize your learning materials. For example, you can create a set for 'Math Concepts' and another for 'Historical Dates'. Each set contains its own set of cards, making it easier to focus on specific topics during your study sessions. You can update, remove and add new or existing card sets to your liking.",
    },
    {
      title: "Cards",
      description:
        "Cards represent the individual learning units within a set. Each card typically contains a question on one side and the corresponding answer on the other. During a study session, you'll flip through these cards, attempting to answer the questions correctly. This interactive approach is an effective way to reinforce your knowledge and recall facts or concepts. You can update, remove and add new or existing cards to your liking.",
    },
    {
      title: "Stats",
      description:
        "Your application keeps track of your learning progress through sessions. After each session, you can review your performance statistics. The key metric is the fraction of cards you answered correctly. If this fraction surpasses your previous best, it becomes your new personal best. These statistics help you track your improvement over time and set new goals for your learning journey.",
    },
  ];
  const renderItem = ({ item }) => (
    <Description title={item.title} description={item.description} />
  );

  return (
    <View style={usedTheme.HELP.container}>
      <FlatList
        data={DUMMYDATA}
        numColumns={1}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
};

export default Help;
