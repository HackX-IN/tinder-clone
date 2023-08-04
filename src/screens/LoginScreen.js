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
} from "react-native";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { useAuth } from "../Hooks/UserContext";

const LoginScreen = ({ navigation }) => {
  const [type, setType] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { setUser, setLoading, loading } = useAuth();

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
  }, [type]);

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
    if (!email.trim() || !password.trim() || !name.trim()) {
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

      // Set the user's display name
      await updateProfile(userCredential.user, {
        displayName: name,
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
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {loading ? (
          <ActivityIndicator size="large" color="purple" />
        ) : (
          <>
            <Text style={styles.title}>{type === 1 ? "Login" : "Sign Up"}</Text>
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
    color: "black",
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
