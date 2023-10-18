import React from "react";
import { Text, View, Switch } from "react-native";
import { Sun, Moon } from "react-native-feather";
import { useTheme } from "../ThemeContext";
import { LIGHT_THEME, DARK_THEME } from "../themes";

const Settings = () => {
  const { isDarkMode, toggleTheme, theme } = useTheme(); // Use the useTheme hook
  const usedTheme = theme === "light" ? LIGHT_THEME : DARK_THEME;
  return (
    <View style={usedTheme.SETTINGS.container}>
      <Text style={usedTheme.SETTINGS.title}>Settings</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: 15,
          backgroundColor: theme === "light" ? "lavender" : "midnightblue",
        }}
      >
        <Sun
          stroke={theme === "light" ? "orange" : "white"}
          fill="#fff"
          width={32}
          height={32}
        />
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
        <Moon
          stroke={theme === "dark" ? "white" : "black"}
          fill="#fff"
          width={32}
          height={32}
        />
      </View>
    </View>
  );
};

export default Settings;
