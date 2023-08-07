import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import Header from "../Components/Header";
import tw from "tailwind-react-native-classnames";

import { useAuth } from "../Hooks/UserContext";
import { useRoute } from "@react-navigation/native";
import ReceiverMessage from "../Components/ReceiverMessage.js";
import SenderMessage from "../Components/SenderMessage.js";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db, timestamp } from "../../firebase";

const MessageScreen = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { matchedUser } = route.params;

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "matches", matchedUser.id, "messages"),
        orderBy("timestamp", "desc")
      ),
      (snapShot) =>
        setMessages(
          snapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
    );

    return unsubscribe;
  }, [matchedUser]);

  const sendMessage = () => {
    addDoc(collection(db, "matches", matchedUser.id, "messages"), {
      timestamp,
      userId: user.uid,
      displayName: user.displayName,
      photoURL: matchedUser?.photoURL,
      message: input,
    });

    setInput("");
  };

  return (
    <SafeAreaView
      style={[
        tw.style("pt-5 flex-1"),
        [
          {
            marginTop: Platform.OS === "android" ? 15 : 0,
          },
        ],
      ]}
    >
      <Header title={matchedUser?.displayName} callEnabled />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw.style("flex-1")}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            style={tw.style("pl-4")}
            keyExtractor={(item) => item.id}
            inverted={true}
            renderItem={({ item: message }) =>
              message.userId === user.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>

        <View
          style={tw.style(
            "flex-row justify-between items-center bg-white border-t border-gray-200 px-5 py-2"
          )}
        >
          <TextInput
            style={tw.style("h-10 text-lg")}
            placeholder="Send Message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <Button onPress={sendMessage} title="Send" color="#FF5864" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;
