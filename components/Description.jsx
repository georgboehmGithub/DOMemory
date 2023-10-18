import React from "react";
import { Text, View } from "react-native";
import { LIGHT_THEME, DARK_THEME } from "../themes";
import { useTheme } from "../ThemeContext";

const Description = ({ title, description }) => {
  const { theme } = useTheme();
  const usedTheme =
    theme === "light"
      ? LIGHT_THEME.HELP.DESCRIPTION
      : DARK_THEME.HELP.DESCRIPTION;
  return (
    <View style={usedTheme.container}>
      <Text style={usedTheme.title}>{title}</Text>
      <Text style={usedTheme.description}>{description}</Text>
    </View>
  );
};

export default Description;
