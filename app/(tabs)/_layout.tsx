import { FC } from "react";
import { Tabs } from 'expo-router';
import {AntDesign, Octicons, MaterialCommunityIcons} from "@expo/vector-icons"

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2E4A66'
      }}
      // backBehavior="history"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="exam"
        options={{
          title: 'Teste',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? 'file-document-edit' : 'file-document-edit-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: 'User',
          tabBarIcon: ({ color, focused }) => (
            <Octicons name={focused ? 'person-fill' : 'person'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
