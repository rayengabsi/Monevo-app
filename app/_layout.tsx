import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { AuthProvider } from '@/config/contexts/authContext';

const StackLayout = () => {
  return <Stack screenOptions={{ headerShown: false }} />;
};
export default function RootLayout() {
  return (
    <AuthProvider><StackLayout /></AuthProvider>
  );
};



const styles = StyleSheet.create({})