import {NavigationContainer} from '@react-navigation/native';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './screens/Home';
import Help from './screens/Help';
import Stats from './screens/Stats';
import Settings from './screens/Settings';
import SetOverview from './screens/SetOverview';
import React, { useEffect } from 'react';
import { initializeSetDatabase } from "./database";

// TODO: import Ionicons from '@expo/vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeStack" component={Home} />
      <Stack.Screen name="SetOverview" component={SetOverview} />
    </Stack.Navigator>
  );
}

export default function App() {

  useEffect(() => {
    // if no sets exist yet, create new database table
    initializeSetDatabase();
  }, [])
  
  
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Help" component={Help} />
      <Tab.Screen name="Stats" component={Stats} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
    </NavigationContainer>
  )
}