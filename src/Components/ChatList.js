import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ChatRow from "./ChatRow";
import { useAuth } from "../Hooks/UserContext";
import tw from "tailwind-react-native-classnames";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(db, "matches"), // Corrected this line
        where("usersMatched", "array-contains", user.uid)
      ),
      (snapshot) =>
        setMatches(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
    );
    return unsub;
  }, [user]);

  return matches.length > 0 ? (
    <FlatList
      style={tw.style("h-full")}
      data={matches}
      renderItem={({ item }) => <ChatRow item={item} />}
    />
  ) : (
    <View style={tw.style("p-5")}>
      <Text className="text-xl text-gray-800 text-center">No Chats</Text>
    </View>
  );
};

export default ChatList;
