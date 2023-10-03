import {NavigationContainer} from '@react-navigation/native';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './screens/Home';
import Help from './screens/Help';
import Stats from './screens/Stats';
import Settings from './screens/Settings';

// TODO: import Ionicons from '@expo/vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Help" component={Help} />
      <Tab.Screen name="Stats" component={Stats} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
    </NavigationContainer>
  )
}