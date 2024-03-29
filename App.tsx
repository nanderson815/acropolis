import React from 'react';
import Feed from './src/stacks/feed/Feed';
import {NavigationContainer} from '@react-navigation/native';
import Profile from './src/stacks/Profile';
import {RootStackParamList} from './src/types/RouteProps';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Home from './src/stacks/home/Home';
import Poll from './src/stacks/Poll';

const Tabs = createBottomTabNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Tabs.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Tabs.Screen name="Feed" component={Feed} />
          <Tabs.Screen name="Home" component={Home} />
          <Tabs.Screen name="Poll" component={Poll} />
          <Tabs.Screen name="Profile" component={Profile} />
        </Tabs.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
