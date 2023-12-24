import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Chat from "./screens/Chat";
import Paraphrase from "./screens/Paraphrase";

import AfterVisualQA from "./screens/AfterVQA";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: "#1F2937",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: "#1F2937",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Paraphrase"
          component={Paraphrase}
          options={{
            title: "Monio Paraphrase",
            headerStyle: {
              backgroundColor: "#1F2937",
            },
            headerTintColor: "#fff",
          }}
        />

        <Stack.Screen
          name="AfterVisualQA"
          component={AfterVisualQA}
          options={{
            title: "VQA-MODEL",
            headerStyle: {
              backgroundColor: "#1F2937",
            },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
