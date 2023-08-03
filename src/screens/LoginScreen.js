import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";

const LoginScreen = () => {
  const [type, setType] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
  }, [type]);

  const handleLogin = () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Please fill all the fields");
    }
  };

  const handleRegister = () => {
    if (email.trim() === "" || password.trim() === "" || name.trim() === "") {
      Alert.alert("Please fill all the fields");
    }
  };

  return (
    <ImageBackground style={{ flex: 1 }} source={require("../assets/bg.jpg")}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 24, color: "white", fontWeight: "bold" }}>
          {type === 1 ? "Login" : "Sign Up"}
        </Text>
        {type === 2 ? (
          <TextInput
            placeholder="Enter Your Name"
            placeholderTextColor={"white"}
            value={name}
            onChangeText={setName}
            style={{
              width: "80%",
              height: 40,
              borderColor: "white",
              borderWidth: 1,
              color: "black",
              marginTop: 10,
              paddingHorizontal: 10,
              borderRadius: 8,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          />
        ) : null}
        <TextInput
          keyboardType={"email-address"}
          placeholder="Enter Your Email"
          placeholderTextColor={"white"}
          value={email}
          onChangeText={setEmail}
          style={{
            width: "80%",
            height: 40,
            borderColor: "white",
            borderWidth: 1,
            color: "black",
            marginTop: 10,
            paddingHorizontal: 10,
            borderRadius: 8,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <TextInput
          placeholder="Enter Your Password"
          placeholderTextColor={"white"}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          style={{
            width: "80%",
            height: 40,
            borderColor: "white",
            borderWidth: 1,
            color: "black",
            marginTop: 10,
            paddingHorizontal: 10,
            borderRadius: 8,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "purple",
            width: 120,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            marginTop: 20,
          }}
          onPress={type === 1 ? handleLogin : handleRegister}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {type === 1 ? "Login" : "Register"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setType(type === 1 ? 2 : 1)}>
          <Text style={{ color: "white", marginTop: 10 }}>
            {type === 1
              ? "Don't have an Account? Sign Up"
              : "Already have an Account? Sign In"}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
