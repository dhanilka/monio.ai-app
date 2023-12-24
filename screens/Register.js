import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Register = ({ navigation }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Register</Text>
      <TouchableOpacity
        className="bg-blue-500 p-2 rounded-md mt-5"
        onPress={() => navigation.replace("Login")}
      >
        <Text className="text-white font-bold text-2xl">Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
