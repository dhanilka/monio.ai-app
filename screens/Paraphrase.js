import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import axios from "axios";

const Paraphrase = () => {
  const [text, settext] = useState("");
  const [isloading, setisloading] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    setCharacterCount(text.length);
  }, [text]);

  function paraphrase() {
    Keyboard.dismiss();
    setisloading(true);

    axios
      .post("http://monio.yourfreekeys.com/paraphrase", {
        text: text,
      })
      .then((res) => {
        settext(res.data);

        setisloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#1F2937" }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={{ alignSelf: "center" }}>
            <TextInput
              className="bg-slate-800 text-white p-2 rounded-lg"
              placeholder="Enter or paste your  text to paraphrase"
              placeholderTextColor="grey"
              multiline={true}
              numberOfLines={100}
              style={{
                height: responsiveHeight(40),
                width: responsiveWidth(90),
                borderColor: "grey",
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                color: "#fff",
                textAlignVertical: "top",
                marginTop: responsiveHeight(2),
                marginBottom: responsiveHeight(0),
                fontSize: responsiveFontSize(2),
              }}
              value={text}
              onChangeText={(text) => settext(text)}
            />
            <Text
              className={`text-white ${
                characterCount > 2000 ? "text-red-500" : ""
              }`}
              style={{ alignSelf: "flex-end", margin: 3 }}
            >
              {characterCount}/2000
            </Text>
          </View>
          <View>
            <TouchableOpacity
              className={`bg-slate-700 p-2 rounded-lg ${
                characterCount > 2000 ? "opacity-50" : ""
              }`}
              style={{
                alignSelf: "center",
                marginTop: responsiveHeight(1),
                marginBottom: responsiveHeight(5),
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={paraphrase}
              disabled={isloading || characterCount > 2000}
            >
              {isloading ? (
                <Text
                  className="text-gray-100 text-lg font-bold"
                  style={{
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Paraphrasing <ActivityIndicator size="small" color="#fff" />
                </Text>
              ) : (
                <Text
                  className="text-gray-100 text-lg font-bold"
                  style={{
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Paraphrase
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Paraphrase;
