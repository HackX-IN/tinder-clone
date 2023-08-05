import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Header from "../Components/Header";
import ChatList from "../Components/ChatList";
import tw from "tailwind-react-native-classnames";
import { Platform } from "react-native";
import { StatusBar } from "react-native";

const ChatScreen = () => {
  return (
    <SafeAreaView
      style={[
        tw.style("pt-5"),
        {
          marginTop: Platform.OS === "android" ? 15 : 0,
        },
      ]}
    >
      <Header title="Chat" />
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;
