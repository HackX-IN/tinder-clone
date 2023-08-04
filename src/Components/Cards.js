import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import Swiper from "react-native-deck-swiper";
import { Dummy } from "../utils/Dummy data";
import { Ionicons } from "@expo/vector-icons";
const Cards = ({ swipeLeft, swipeRight, profiles }) => {
  console.log(profiles);
  const Swiperef = useRef();
  return (
    <View className="flex-1 -mt-6 ">
      <Swiper
        ref={Swiperef}
        containerStyle={{
          backgroundColor: "transparent",
        }}
        cards={profiles}
        stackSize={5}
        cardIndex={0}
        animateCardOpacity
        verticalSwipe={false}
        onSwipedLeft={(cardIndex) => {
          console.log("Swipe Pass");
          swipeLeft(cardIndex);
        }}
        onSwipedRight={(cardIndex) => {
          console.log("Swipe Match");
          swipeRight(cardIndex);
        }}
        overlayLabels={{
          left: {
            title: "Nope",
            style: {
              label: {
                textAlign: "right",
                color: "red",
              },
            },
          },
          right: {
            title: "Match",
            style: {
              label: {
                color: "green",
              },
            },
          },
        }}
        renderCard={(card) => {
          return card ? (
            <View key={card.id} className="bg-white h-3/4 rounded-3xl relative">
              <Image
                className="absolute h-full w-full rounded-3xl"
                source={{ uri: card.image }}
              />
              <View className="absolute bottom-0 h-20 w-full rounded-bl-3xl rounded-br-3xl flex-row px-6 py-2 justify-between items-center bg-white">
                <View>
                  <Text className="text-xl font-bold">{card.name}</Text>
                  <Text className="text-gray-500">{card.job}</Text>
                </View>
                <Text className="text-xl text-gray-500">{card.age}</Text>
              </View>
            </View>
          ) : (
            <View className="relative h-3/4 rounded-xl justify-center items-center bg-white shadow-xl">
              <Text className="font-bold pb-5">No More Profiles</Text>
              <Image
                source={{
                  uri: "https://w7.pngwing.com/pngs/251/931/png-transparent-iphone-emoji-sadness-smiley-emoji-electronics-face-emoticon-thumbnail.png",
                }}
                className="h-20 w-20"
                style={{ resizeMode: "cover" }}
              />
            </View>
          );
        }}
      />
      <View className="flex flex-row justify-evenly bottom-0 absolute items-center left-20 right-20">
        <TouchableOpacity
          className="items-center justify-center rounded-full w-16 h-16 bg-red-200"
          onPress={() => Swiperef.current.swipeLeft()}
        >
          <Ionicons name="close-outline" size={28} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center justify-center rounded-full w-16 h-16 bg-green-200"
          onPress={() => Swiperef.current.swipeRight()}
        >
          <Ionicons name="heart" size={28} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cards;
