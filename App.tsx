import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import NewTask from './src/screens/NewTask';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'TaskApp' }}
        />
        <Stack.Screen
          name="NewTask"
          component={NewTask}
          options={{ title: 'Nova Tarefa' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}