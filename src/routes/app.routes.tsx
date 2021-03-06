import React from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Dashboard, Register, Resume } from '../screens';

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes = () => {
  const { colors } = useTheme();

  return (
    <Navigator 
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          height: 88,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        }
      }}
    >
      <Screen 
        name="Listagem" 
        component={Dashboard} 
        options={{
          tabBarIcon: (({ size, color }) => 
            <MaterialIcons 
              name="format-list-bulleted" 
              size={size}
              color={color}
            />
          )
        }}
      />

      <Screen 
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: (({ size, color }) => 
            <MaterialIcons 
              name="attach-money" 
              size={size}
              color={color}
            />
          )
        }}
      />

      <Screen 
        name="Resumo" 
        component={Resume} 
        options={{
          tabBarIcon: (({ size, color }) => 
            <MaterialIcons 
              name="pie-chart" 
              size={size}
              color={color}
            />
          )
        }}
      />
    </Navigator>
  )
};