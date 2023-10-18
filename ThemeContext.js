import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Retrieve the theme preference from AsyncStorage when the app starts
  useEffect(() => {
    AsyncStorage.getItem("theme").then((theme) => {
      if (theme === "dark") {
        setIsDarkMode(true);
      } else {
        setIsDarkMode(false);
      }
    });
  }, []);

  const toggleTheme = () => {
    // Invert the theme preference and save it to AsyncStorage
    setIsDarkMode(!isDarkMode);
    AsyncStorage.setItem("theme", isDarkMode ? "light" : "dark");
  };

  const theme = isDarkMode ? "dark" : "light";

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
