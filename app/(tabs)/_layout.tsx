import { FC, useEffect, useState } from "react";
import { Redirect, Tabs } from 'expo-router';
import {AntDesign, Octicons, MaterialCommunityIcons} from "@expo/vector-icons"
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { initAPI } from "@/services/api";
import { useSession } from "@/context/auth-contex";
import { View } from "react-native";
import { USER_ACCESS_TOKEN } from "@/constants";
import { useStorageState } from "@/constants/async-storage";
import CustomBottomTab from "@/components/custom-bottom-tab";

export default function TabLayout() {
   useEffect(() => {
    initAPI()
  }, [])

  const { loading, token } = useStorageState();

  console.log("session", token)


  if(loading) return <View style={{ flex: 1, backgroundColor: '#fff' }}></View>

  if (!token) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2E4A66',
      }}
      // tabBar={}
      // backBehavior="history"
      tabBar={props => (
        <CustomBottomTab {...props} />
      )}

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
        name="children"
        options={{
          title: 'Crianças',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 name="children" color={color} size={24} />
            // <MaterialCommunityIcons name={focused ? 'file-document-edit' : 'file-document-edit-outline'} color={color} size={24} />
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
