import { View, Text } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { TouchableOpacity } from "react-native";
import { Foundation, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ callEnabled, title }) => {
  const navigation = useNavigation();
  return (
    <View className="flex-row justify-between p-2 items-center">
      <TouchableOpacity
        style={tw.style("p-2 flex-row items-center")}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back-outline" size={34} color="FF5864" />
        <Text style={tw.style("text-2xl font-bold pl-2")}>{title}</Text>
      </TouchableOpacity>
      {callEnabled && (
        <TouchableOpacity
          style={tw.style("p-2 rounded-2xl mr-4 p-3 bg-red-200 items-center ")}
        >
          <Foundation name="telephone" size={24} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
