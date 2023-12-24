import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Camerax({ navigation }) {
  const cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [isCapturing, setIsCapturing] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for the camera not granted. Please change this in settings.
      </Text>
    );
  }

  const takePic = async () => {
    // Check if a photo capture is already in progress
    if (isCapturing) {
      console.warn(
        "Another photo capture is already being processed. Await the first call."
      );
      return;
    }

    setIsCapturing(true);

    try {
      let options = {
        quality: 1,
        base64: true,
        exif: false,
      };

      let newPhoto = await cameraRef.current.takePictureAsync(options);

      navigation.navigate("AfterVisualQA", { photo: newPhoto });
    } catch (error) {
      console.error("Error capturing photo", error);
    } finally {
      setIsCapturing(false);
    }
  };

  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  if (photo) {
    const sharePic = async () => {
      try {
        await shareAsync(photo.uri);
        setPhoto(undefined);
      } catch (error) {
        console.error("Error sharing photo", error);
      }
    };

    const savePhoto = async () => {
      try {
        await MediaLibrary.saveToLibraryAsync(photo.uri);
        setPhoto(undefined);
      } catch (error) {
        console.error("Error saving photo", error);
      }
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <Button title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission ? (
          <Button title="Save" onPress={savePhoto} />
        ) : null}
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={{ width: "100%", height: "70%" }}
        ref={cameraRef}
        type={cameraType}
      >
        <StatusBar style="auto" />
      </Camera>
      <View>
        <TouchableOpacity style={styles.buttonContainer} onPress={takePic}>
          <Icon name="camera" color="#fff" size={35} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={toggleCameraType}
        >
          <Icon name="refresh" color="#fff" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F2937",
  },
  buttonContainer: {
    backgroundColor: "#4A5568",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    width: "50%",
    height: "20%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
