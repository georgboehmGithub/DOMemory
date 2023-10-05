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

// TODO: import Ionicons from '@expo/vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack({isSetDatabaseInitialized}) {
  return (
    <Stack.Navigator>
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
      <Tab.Navigator>
      <Tab.Screen name="Home" children={() => <HomeStack isSetDatabaseInitialized={isSetDatabaseInitialized}/>} />
      <Tab.Screen name="Help" component={Help} />
      <Tab.Screen name="Stats" component={Stats} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
    </NavigationContainer>
  )
}