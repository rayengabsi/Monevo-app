import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet , Text, View } from "react-native";
import CustomTabs from "@/components/CustomTabs";


const _layout = () => {
return (
  <Tabs tabBar={ CustomTabs } screenOptions={{ headerShown: false }}>
    <Tabs.Screen name="index" />
    <Tabs.Screen name="wallet" />
    <Tabs.Screen name="statistics" />
    <Tabs.Screen name="profile" />
  </Tabs>
);
};


export default _layout;

const styles = StyleSheet.create({});
 