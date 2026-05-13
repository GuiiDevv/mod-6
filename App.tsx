import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import EditTask from './src/screens/EditTask';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'TaskApp',
            headerLeft: () => null,
            headerBackVisible: false,
            headerStyle: { backgroundColor: '#dfdada' },
          }} // remove o botao de voltar do header no home. Força tambem pra ele n aparecer;
        />
        <Stack.Screen
          name="EditTask"
          component={EditTask}
          options={{ title: 'Editar tarefa' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
