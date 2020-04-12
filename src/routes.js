import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';

import Deliveries from '~/pages/Deliveries';
import Profile from '~/pages/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes({ signedIn }) {
  return (
    <>
      {!signedIn ? (
        <SignIn />
      ) : (
        <>
          <StatusBar barStyle="light-content" backgroundColor="#fff" />
          <NavigationContainer>
            <Tab.Navigator
              tabBarOptions={{
                activeTintColor: '#7D40E7',
                inactiveTintColor: '#999',
              }}
            >
              <Tab.Screen
                name="Deliveries"
                component={Deliveries}
                options={{
                  tabBarLabel: 'Entregas',
                  tabBarIcon: ({ color }) => (
                    <Icon name="reorder" color={color} size={20} />
                  ),
                }}
              />
              <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                  tabBarLabel: 'Meu perfil',
                  tabBarIcon: ({ color }) => (
                    <Icon name="account-circle" color={color} size={20} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </>
      )}
    </>
  );
}
