import {NavigationContainer} from '@react-navigation/native';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './screens/Home';
import Help from './screens/Help';
import Stats from './screens/Stats';
import Settings from './screens/Settings';
import SetOverview from './screens/SetOverview';
import React, { useEffect, useState } from 'react';
import { initializeSetDatabase, initializeCardDatabase } from "./database";
import Session from './screens/Session';
import { SafeAreaView, Platform} from 'react-native';
import { AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack({isSetDatabaseInitialized}) {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen
        name="HomeStack"
        component={Home}
        initialParams={{ isSetDatabaseInitialized: isSetDatabaseInitialized }}
      />
      <Stack.Screen name="SetOverview" component={SetOverview} />
      <Stack.Screen name="Session" component={Session} />
    </Stack.Navigator>
  );
}


export default function App() {

  const [isSetDatabaseInitialized, setIsSetDatabaseInitialized] = useState(false);

  useEffect(() => {
    // Initialize the set database if it has not yet been created
    initializeSetDatabase(() => {
      setIsSetDatabaseInitialized(true);
    });
    // Initialize the card database if it has not yet been created
    initializeCardDatabase(() => {
    })
  }, []);
 
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1, paddingTop: Platform.OS === 'android' ? 35 : 0}}>
      <Tab.Navigator screenOptions={{
    headerShown: false
  }}>
      <Tab.Screen options={{
      tabBarLabel: 'Home',
      tabBarIcon: ({ color, size }) => (
        <AntDesign name="home" color={color} size={size} />
      ),
    }} name="Home" children={() => <HomeStack isSetDatabaseInitialized={isSetDatabaseInitialized}/>} />
      <Tab.Screen options={{
      tabBarLabel: 'Help',
      tabBarIcon: ({ color, size }) => (
        <AntDesign name="questioncircleo" color={color} size={size} />
      ),
    }} name="Help" component={Help} />
      <Tab.Screen options={{
      tabBarLabel: 'Stats',
      tabBarIcon: ({ color, size }) => (
        <AntDesign name="barschart" color={color} size={size} />
      ),
    }} name="Stats" component={Stats} />
      <Tab.Screen options={{
      tabBarLabel: 'Settings',
      tabBarIcon: ({ color, size }) => (
        <AntDesign name="setting" color={color} size={size} />
      ),
    }} name="Settings" component={Settings} />
    </Tab.Navigator>
    </SafeAreaView>
    </NavigationContainer>
  )
}