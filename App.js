import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SetsOverview from "./screens/SetsOverview";
import Help from "./screens/Help";
import Stats from "./screens/Stats";
import Settings from "./screens/Settings";
import CardsOverview from "./screens/CardsOverview";
import React, { useEffect, useState } from "react";
import { initializeSetDatabase, initializeCardDatabase } from "./database";
import Session from "./screens/Session";
import { SafeAreaView, Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ThemeProvider } from "./ThemeContext";
import { useTheme } from "./ThemeContext";
import { LIGHT_THEME, DARK_THEME } from "./themes";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function OverviewStack({ isSetDatabaseInitialized }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="OverviewStack"
        component={SetsOverview}
        initialParams={{ isSetDatabaseInitialized: isSetDatabaseInitialized }}
      />
      <Stack.Screen name="CardsOverview" component={CardsOverview} />
      <Stack.Screen name="Session" component={Session} />
    </Stack.Navigator>
  );
}

const AppWrapper = ({ isSetDatabaseInitialized }) => {
  const { theme } = useTheme();
  const usedTheme = theme === "light" ? LIGHT_THEME : DARK_THEME;

  return (
    <NavigationContainer>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? 35 : 0,
          backgroundColor: usedTheme.background,
          color: usedTheme.text,
        }}
      >
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: usedTheme.background,
            },
          }}
        >
          <Tab.Screen
            options={{
              tabBarLabel: "Overview",
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="home" color={color} size={size} />
              ),
              tabBarActiveTintColor: usedTheme.tabBarActiveTintColor,
              tabBarInactiveTintColor: usedTheme.tabBarInactiveTintColor,
            }}
            name="Overview"
            children={() => (
              <OverviewStack
                isSetDatabaseInitialized={isSetDatabaseInitialized}
              />
            )}
          />
          <Tab.Screen
            options={{
              tabBarLabel: "Help",
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="questioncircleo" color={color} size={size} />
              ),
              tabBarActiveTintColor: usedTheme.tabBarActiveTintColor,
              tabBarInactiveTintColor: usedTheme.tabBarInactiveTintColor,
            }}
            name="Help"
            component={Help}
          />
          <Tab.Screen
            options={{
              tabBarLabel: "Stats",
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="barschart" color={color} size={size} />
              ),
              tabBarActiveTintColor: usedTheme.tabBarActiveTintColor,
              tabBarInactiveTintColor: usedTheme.tabBarInactiveTintColor,
            }}
            initialParams={{
              isSetDatabaseInitialized: isSetDatabaseInitialized,
            }}
            name="Stats"
            component={Stats}
          />
          <Tab.Screen
            options={{
              tabBarLabel: "Settings",
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="setting" color={color} size={size} />
              ),
              tabBarActiveTintColor: usedTheme.tabBarActiveTintColor,
              tabBarInactiveTintColor: usedTheme.tabBarInactiveTintColor,
            }}
            name="Settings"
            component={Settings}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default function App() {
  const [isSetDatabaseInitialized, setIsSetDatabaseInitialized] =
    useState(false);

  useEffect(() => {
    // Initialize the set database if it has not yet been created
    initializeSetDatabase(() => {
      setIsSetDatabaseInitialized(true);
    });
    // Initialize the card database if it has not yet been created
    initializeCardDatabase(() => {});
  }, []);

  return (
    <ThemeProvider>
      <AppWrapper isSetDatabaseInitialized={isSetDatabaseInitialized} />
    </ThemeProvider>
  );
}
