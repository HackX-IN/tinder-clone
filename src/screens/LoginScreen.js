import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Button,
} from "react-native";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { useAuth } from "../Hooks/UserContext";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const LoginScreen = ({ navigation }) => {
  const [type, setType] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const { setUser, setLoading, loading } = useAuth();

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
  }, [type]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });

    if (!result.cancelled) {
      try {
        setLoading(true);

        const imageUrl = result.uri; // Use the URI directly

        // Now you can use the imageUrl as needed
        setImage(imageUrl);
      } catch (error) {
        console.error("Error processing image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Please fill all the fields");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      Alert.alert("Logged in successfully!");
      navigation.replace("Home");
    } catch (error) {
      Alert.alert("Error logging in: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = async () => {
    if (!email.trim() || !password.trim() || !name.trim() || !image.trim()) {
      Alert.alert("Please fill all the fields");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: image,
      });
      setUser(userCredential.user);
      Alert.alert("User registered successfully!");
      setType(1);
    } catch (error) {
      Alert.alert("Error creating user: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground style={{ flex: 1 }} source={require("../assets/bg.jpg")}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <>
            <Text style={styles.title}>{type === 1 ? "Login" : "Sign Up"}</Text>
            {type === 2 && (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity onPress={pickImage}>
                  {image ? (
                    <Image
                      source={{ uri: image }}
                      style={{ width: 80, height: 80, borderRadius: 35 }}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: "https://img.icons8.com/?size=512&id=13075&format=png",
                      }}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 5,
                        borderColor: "black",
                        borderWidth: 1,
                        resizeMode: "contain",
                      }}
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}
            {type === 2 && (
              <TextInput
                placeholder="Enter Your Name"
                placeholderTextColor="white"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
            )}
            <TextInput
              keyboardType="email-address"
              placeholder="Enter Your Email"
              placeholderTextColor="white"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              placeholder="Enter Your Password"
              placeholderTextColor="white"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={type === 1 ? handleLogin : handleRegister}
            >
              <Text style={styles.buttonText}>
                {type === 1 ? "Login" : "Register"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setType(type === 1 ? 2 : 1)}>
              <Text style={styles.toggleText}>
                {type === 1
                  ? "Don't have an Account? Sign Up"
                  : "Already have an Account? Sign In"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    color: "white",
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  button: {
    backgroundColor: "purple",
    width: 120,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  toggleText: {
    color: "white",
    marginTop: 10,
  },
});

export default LoginScreen;
