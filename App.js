import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WeatherList from './WeatherList';
import WeatherDetail from './WeatherDetail';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="WeatherList" component={WeatherList} options={{ title: 'Weather' }} />
                <Stack.Screen name="WeatherDetail" component={WeatherDetail} options={{ title: 'Weather Details' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
