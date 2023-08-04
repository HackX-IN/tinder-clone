import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import MessageScreen from "../screens/MessageScreen";
import ChatScreen from "../screens/Chatscreen";
import ModalScreen from "../screens/ModalScreen";
import MatchScreen from "../screens/MatchScreen";
import { useAuth } from "../Hooks/UserContext";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Message" component={MessageScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="Modal" component={ModalScreen} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
          <Stack.Screen name="Match" component={MatchScreen} />
        </Stack.Group>
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }
};

export default Navigation;
