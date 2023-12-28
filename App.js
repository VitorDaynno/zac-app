import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/pages/Login';
import Home from './src/pages/Home';
import Task from './src/pages/Task';
import ModalContextProvider from './src/contexts/ModalContextProvider';
import UserContextProvider from './src/contexts/UserContextProvider';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ModalContextProvider>
        <UserContextProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Task" component={Task} />
          </Stack.Navigator>
        </UserContextProvider>
      </ModalContextProvider>
    </NavigationContainer>
  );
}