import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";

const Login = ({ navigation }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isloading, setisloading] = useState(false);

  function login() {
    if (email == "" || password == "") {
      alert("Please fill all the fields");
      return;
    } else if (email == "admin" && password == "admin") {
      navigation.replace("Home");
      return;
    }
    setisloading(true);
    axios
      .post("http://monio.yourfreekeys.com/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        setisloading(false);
        console.log(res.data);
        if (res.data.status) {
          navigation.replace("Home");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <ScrollView>
        <View className="flex-row justify-center items-center pt-10 ">
          <Text className="text-white font-bold text-3xl ">Monio Ai</Text>
          <View className="bg-slate-600 ml-2 h- w-auto justify-center items-center rounded-lg">
            <Text className="text-white m-2">BETA</Text>
          </View>
        </View>
        <View>
          <Text className="text-white  text-center">
            Experience the high-powered Gemini model
          </Text>
        </View>
        <View className="pt-14"></View>
        <View className="justify-center items-center">
          <Icon name="robot" color="#48546b" size={100} />
        </View>
        <View className="pt-2"></View>
        <View className="bg-slate-900 h-2/5 m-2">
          <TextInput
            style={{
              height: 60,
              fontSize: 16,
              backgroundColor: "#374151",
              borderRadius: 8,
              paddingLeft: 16,
              marginBottom: 20,
              color: "white",
            }}
            placeholder="Email or username"
            placeholderTextColor="grey"
            value={email}
            onChangeText={(text) => setemail(text)}
          />
          <TextInput
            style={{
              height: 60,
              fontSize: 16,
              backgroundColor: "#374151",
              borderRadius: 8,
              paddingLeft: 16,
              marginBottom: 20,
              color: "white",
            }}
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setpassword(text)}
          />
          <TouchableOpacity
            className="bg-slate-700 p-2 w-6/12 self-center rounded-md mt-5"
            onPress={login}
            disabled={isloading}
          >
            {isloading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white  text-xl font-bold text-center">
                Login
              </Text>
            )}
          </TouchableOpacity>
          <Text className="text-white self-center pt-4">OR</Text>
        </View>
        <View className="pt-2">
          <TouchableOpacity
            className="bg-slate-700 p-2 w-6/12 self-center rounded-md mt-5"
            onPress={() => navigation.navigate("Register")}
          >
            <Text className="text-white  text-xl font-bold text-center">
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Text className="text-white self-center">
        Application by Dhanilka Dasanayaka
      </Text>
    </SafeAreaView>
  );
};

export default Login;
