import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';

import Deliveries from '~/pages/Deliveries';
import Details from '~/pages/Details';
import NewProblem from '~/pages/NewProblem';
import Problems from '~/pages/Problems';
import FinishDelivery from '~/pages/FinishDelivery';

import Profile from '~/pages/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function DeliveriesStack() {
  return (
    <Stack.Navigator
      initialRouteName="Deliveries"
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: '#7d40e7' },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={20} color="#fff" />
          </TouchableOpacity>
        ),
        headerLeftContainerStyle: { marginLeft: 20 },
      })}
    >
      <Stack.Screen
        name="Deliveries"
        component={Deliveries}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{ title: 'Detalhes da encomenda' }}
      />
      <Stack.Screen
        name="NewProblem"
        component={NewProblem}
        options={{ title: 'Informar problema' }}
      />
      <Stack.Screen
        name="Problems"
        component={Problems}
        options={{ title: 'Visualizar problemas' }}
      />
      <Stack.Screen
        name="FinishDelivery"
        component={FinishDelivery}
        options={{ title: 'Confirmar entrega' }}
      />
    </Stack.Navigator>
  );
}

export default function Routes({ signedIn }) {
  return (
    <>
      {!signedIn ? (
        <SignIn />
      ) : (
        <>
          <NavigationContainer>
            <Tab.Navigator
              tabBarOptions={{
                activeTintColor: '#7D40E7',
                inactiveTintColor: '#999',
              }}
            >
              <Tab.Screen
                name="Deliveries"
                component={DeliveriesStack}
                options={{
                  tabBarLabel: 'Entregas',
                  tabBarIcon: ({ color }) => (
                    <Icon name="reorder" color={color} size={20} />
                  ),
                  unmountOnBlur: true,
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
