import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FIcon from "react-native-vector-icons/FontAwesome5";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView className=" flex-1 bg-slate-900 ">
      <View className="flex-row justify-center items-center pt-5 ">
        <Text className="text-white font-bold text-3xl ">Monio Ai</Text>
        <View className="bg-slate-600 ml-2 h- w-auto justify-center items-center rounded-lg">
          <Text className="text-white m-2">BETA</Text>
        </View>
      </View>
      <View>
        <Text className="text-white  text-center">
          Experience the high-powered Monio LLM
        </Text>
      </View>
      <ScrollView className="pt-4 m-4">
        <View>
          <TouchableOpacity
            className="bg-slate-700 p-2 rounded-lg"
            onPress={() => navigation.navigate("Chat")}
          >
            <Text className="text-white text-lg font-bold">
              Chat model <Icon name="chat" color="#fff" size={20} />
            </Text>
            <Text className="text-slate-300">
              Elevate your conversational experience with our advanced chat
              model, meticulously trained to craft engaging and insightful
              dialogues by leveraging past interactions. Engage in meaningful
              conversations with a chatbot designed to understand and respond
              contextually.
            </Text>
          </TouchableOpacity>
        </View>

        <View className="pt-4">
          <TouchableOpacity
            className="bg-slate-700 p-2 rounded-lg"
            onPress={() => navigation.navigate("AfterVisualQA")}
          >
            <Text className="text-white text-lg font-bold">
              Visual Question Answering{" "}
              <Icon
                name="image-filter-center-focus-weak"
                color="#fff"
                size={20}
              />
            </Text>
            <Text className="text-slate-300">
              Dive into Visual Question Answering! Our AI-driven chat excels in
              answering queries about visuals, providing context-rich responses
              for engaging and insightful conversations
            </Text>
          </TouchableOpacity>
        </View>
        <View className="pt-4">
          <TouchableOpacity
            className="bg-slate-700 p-2 rounded-lg"
            onPress={() => navigation.navigate("Chat")}
          >
            <Text className="text-white text-lg font-bold">
              Human Writer <FIcon name="user-injured" color="#fff" size={18} />
            </Text>
            <Text className="text-slate-300">
              Unleash the Human Writer! Our AI, like a skilled wordsmith, crafts
              expressive and impactful content, ensuring a human touch in every
              word
            </Text>
          </TouchableOpacity>
        </View>
        <View className="pt-4">
          <TouchableOpacity
            className="bg-slate-700 p-2 rounded-lg"
            onPress={() => navigation.navigate("Chat")}
          >
            <Text className="text-white text-lg font-bold">
              Text paraphrase{" "}
              <Icon name="swap-horizontal-bold" color="#fff" size={20} />
            </Text>
            <Text className="text-slate-300">
              Discover the power of Text Paraphrasing! Our advanced AI, equipped
              with cutting-edge capabilities, reimagines text creatively for
              clearer communication and enhanced understanding.
            </Text>
          </TouchableOpacity>
        </View>
        <View className="pt-4">
          <TouchableOpacity
            className="bg-slate-700 p-2 rounded-lg"
            onPress={() => navigation.navigate("Chat")}
          >
            <Text className="text-white text-lg font-bold">
              Text Generation{" "}
              <Icon
                name="card-bulleted-settings-outline"
                color="#fff"
                size={20}
              />
            </Text>
            <Text className="text-slate-300">
              Discover the power of Text Generation! Large language model.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
