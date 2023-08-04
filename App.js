import { NavigationContainer } from "@react-navigation/native";

import { StyleSheet, Text, View } from "react-native";
import Navigation from "./src/Navigation/Navigation";
import AuthProvider from "./src/Hooks/UserContext";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
