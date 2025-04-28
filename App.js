import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SpeechScreen from './screens/SpeechScreen';
import ExercisesScreen from './screens/ExercisesScreen';
import CommunityScreen from './screens/CommunityScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2E86AB',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Speech" 
          component={SpeechScreen} 
          options={{ title: 'Speech Assistant' }}
        />
        <Stack.Screen 
          name="Exercises" 
          component={ExercisesScreen} 
          options={{ title: 'Speech Exercises' }}
        />
        <Stack.Screen 
        name="Community" 
        component={CommunityScreen} 
        options={{ title: 'Community Support' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}