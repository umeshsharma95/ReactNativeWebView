/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import Event from './screens/Event';

const Stack = createNativeStackNavigator();
const App = () => {

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Home"
            component={Home}
          />
        <Stack.Screen name="Create Event" component={Event} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
