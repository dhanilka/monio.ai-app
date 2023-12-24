import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const AfterVisualQA = ({ navigation, route }) => {
  const { photo } = route.params;
  const [text, settext] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [resText, setresText] = useState("");
  const [isloading, setisloading] = useState(false);

  const handleTap = () => {
    // Dismiss the keyboard on tap anywhere
    Keyboard.dismiss();
  };

  const openGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        // Check if "assets" array is available
        if (result.assets && result.assets.length > 0) {
          // Use the first asset in the array
          const selectedAsset = result.assets[0];
          setSelectedImage(selectedAsset);
        } else {
          console.warn("No assets found in the result");
        }
      }
    } catch (error) {
      console.error("Error picking an image", error);
    }
  };

  const askQuestion = async () => {
    setisloading(true);
    try {
      const formData = new FormData();
      formData.append("text", text); // Use the correct field name expected by the server

      if (selectedImage) {
        // If an image is selected, append it to the form data
        const imageUri = selectedImage.uri;
        const imageName = imageUri.split("/").pop();
        const imageType = "image/jpeg"; // Adjust the type based on your image

        formData.append("image", {
          uri: imageUri,
          name: imageName,
          type: imageType,
        });
      }

      // Make the HTTP POST request using axios
      const response = await axios.post(
        "http://192.168.1.4:5050/visualQA",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for FormData
          },
        }
      );

      // Handle the response as needed
      setisloading(false);
      setresText(response.data);
    } catch (error) {
      console.error("Error asking question:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleTap} accessible={false}>
      <ScrollView style={{ backgroundColor: "#1F2937" }}>
        <KeyboardAvoidingView
          behavior="padding"
          style={{ flex: 1, backgroundColor: "#1F2937" }}
        >
          <View style={{ flex: 1, paddingTop: 10 }}>
            <View style={{ alignSelf: "center" }}>
              {selectedImage ? (
                <Image
                  style={{
                    width: responsiveWidth(80),
                    height: responsiveHeight(30),
                    resizeMode: "contain",
                  }}
                  source={{ uri: selectedImage.uri }}
                />
              ) : photo ? (
                <Image
                  style={{
                    width: responsiveWidth(80),
                    height: responsiveHeight(30),
                    resizeMode: "contain",
                  }}
                  source={{ uri: "data:image/jpg;base64," + photo.base64 }}
                />
              ) : null}
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                paddingTop: 4,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#4A5568",
                  borderRadius: 10,
                  marginLeft: 10,
                  height: responsiveHeight(5),
                  justifyContent: "center",
                }}
                onPress={openGallery}
              >
                <Text style={{ fontSize: 20, color: "white", margin: 4 }}>
                  Choose a picture <Icon name="image" color="#fff" size={15} />
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={{
                  backgroundColor: "#4A5568",
                  borderRadius: 10,
                  marginLeft: 10,
                  height: responsiveHeight(5),
                  justifyContent: "center",
                  alignItems: "center",
                  width: responsiveWidth(30),
                }}
                onPress={() => navigation.navigate("Camera")}
              >
                <Text style={{ fontSize: 20, color: "white", margin: 4 }}>
                  Camera <Icon name="camera" color="#fff" size={15} />
                </Text>
              </TouchableOpacity> */}
            </View>

            <View>
              <TextInput
                placeholder="Enter your question"
                placeholderTextColor="grey"
                multiline={true}
                numberOfLines={100}
                onChangeText={(text) => settext(text)}
                value={text}
                style={{
                  height: responsiveHeight(10),
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
                  alignSelf: "center",
                }}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: "#4A5568",
                  borderRadius: 10,
                  alignSelf: "center",
                  marginTop: responsiveHeight(1),
                  marginBottom: responsiveHeight(5),
                  justifyContent: "center",
                  alignItems: "center",
                  width: responsiveWidth(90),
                  height: responsiveHeight(5),
                }}
                onPress={askQuestion}
                disabled={isloading}
              >
                {isloading ? (
                  <Text
                    style={{
                      alignSelf: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 20,
                      color: "white",
                      margin: 4,
                    }}
                  >
                    Asking <ActivityIndicator size="small" color="#fff" />
                  </Text>
                ) : (
                  <Text style={{ fontSize: 18, color: "white", margin: 4 }}>
                    Ask <Icon name="send" color="#fff" size={15} />
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <View className="bg-slate-900 m-3">
              <Text className="text-white text-md m-4">{resText}</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default AfterVisualQA;
