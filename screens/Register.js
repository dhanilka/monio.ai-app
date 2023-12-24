import { View, Text, Button } from "react-native";
import React from "react";

const Register = ({ navigation }) => {
  return (
    <View className="bg-slate-700 flex-1 justify-center items-center">
      <Text className="text-white font-bold text-2xl">
        Contact Dhanilka for registration. Whatsapp - +94764145565
      </Text>
      <Button
        title="Go Back"
        onPress={() => navigation.replace("Login")}
      ></Button>
    </View>
  );
};

export default Register;
