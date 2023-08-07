import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../Hooks/UserContext";
import getMatch from "./getmatchedData";

const ChatRow = ({ item }) => {
  console.log("item is ", item);
  const navigation = useNavigation();
  const [matchedUser, setmatcheduser] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    setmatcheduser(getMatch(item.users, user.uid));
  }, []);

  return (
    <TouchableOpacity
      className="p-6 space-x-2 mx-3 my-1 shadow-xl rounded-lg flex-row items-center flex bg-white "
      onPress={() => navigation.navigate("Message", { matchedUser })}
    >
      <Image
        source={{ uri: matchedUser?.photoURL }}
        className="h-12 w-12 rounded-full mr-4"
      />
      <View>
        <Text className="text-lg font-semibold">
          {matchedUser?.displayName}
        </Text>
        <Text>Say Hi</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;
