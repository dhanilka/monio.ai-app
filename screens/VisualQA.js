import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const VisualQA = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

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

      // Use "canceled" instead of "cancelled"
      if (!result.canceled) {
        // Use the assets array instead of the deprecated uri property
        const selectedAsset = result.assets[0];

        // Convert the selected image to base64
        const base64Image = await convertToBase64(selectedAsset.uri);

        // Pass the base64 image to the AfterVisualQA page and navigate to it
        navigation.navigate("AfterVisualQA", {
          photo: { base64: base64Image },
        });
      }
    } catch (error) {
      console.error("Error picking an image", error);
    }
  };

  const convertToBase64 = async (uri) => {
    try {
      const fileContent = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return fileContent;
    } catch (error) {
      console.error("Error converting image to base64", error);
      return null;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleTap} accessible={false}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, backgroundColor: "#1F2937" }}
      >
        <View style={{ flex: 1 }}>
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
                alignItems: "center",
                width: responsiveWidth(30),
              }}
              onPress={openGallery}
            >
              <Text style={{ fontSize: 20, color: "white", margin: 4 }}>
                Gallery <Ionicons name="image-outline" color="#fff" size={15} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
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
                Camera <Ionicons name="camera-outline" color="#fff" size={15} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default VisualQA;
