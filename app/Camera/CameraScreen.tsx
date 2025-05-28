import {
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useRef, useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Image } from "expo-image";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Stack, useLocalSearchParams } from "expo-router";
import uploadImage, { addImage } from "@/Services/CameraService";
import DocumentScanner from "react-native-document-scanner-plugin";

export default function App() 
{
  const cameraRef = useRef(null); // ✅ Correct useRef declaration
  const { fileID, district, subDistrict, pageNumber, source ,type} = useLocalSearchParams();
  const [permission, requestPermission] = useCameraPermissions();
  const [uri, setUri] = useState<string | null | undefined>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [disabled , setDisabled]=useState(false);

  if (!permission) return null;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to use the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  const scanAndCapture = async () => {
    try {
      const result = await DocumentScanner.scanDocument();

      if (result?.scannedImages && result.scannedImages.length > 0) {
        setUri(result.scannedImages[0]); // Use the first scanned image
      } else {
        console.warn("Scan cancelled or no images captured.");
      }
    } catch (error) {
      console.error("Scan failed:", error);
    }
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const sendToBackend = async () => {
    if (!uri) return;

    let success;
    setDisabled(true);
    if (source === "replace") {
      success = await uploadImage(
        fileID.toString(),
        district.toString(),
        subDistrict.toString(),
        pageNumber.toString(),
        uri,
        type.toString()
      );
    } else if (source === "add") {
      success = await addImage(
        fileID.toString(),
        district.toString(),
        subDistrict.toString(),
        pageNumber.toString(),
        uri,
        type.toString()
      );
    }

    Alert.alert(success);
    setUri(null);
    setDisabled(false);
  };

  const renderPicture = () => (
    <View style={{ alignItems: "center" }}>
      <Image
        source={{ uri }}
        contentFit="contain"
        style={{ width: 300, aspectRatio: 1, marginBottom: 10 }}
      />
      <Button onPress={() => setUri(null)} title="Retake" />
      <View style={{ marginTop: 20 }}>
        <Button
          onPress={sendToBackend}
          title="OK (Execute Action .)"
          color="orange"
          disabled={disabled}
        />
      </View>
    </View>
  );

  const renderCamera = () => (
    <CameraView
      style={styles.camera}
      ref={cameraRef} // ✅ Correct usage of ref
      facing={facing}
      mute={false}
      responsiveOrientationWhenOrientationLocked
    >
      <View style={styles.shutterContainer}>
        <View style={{ width: 32 }} />
        <Pressable onPress={scanAndCapture}>
          {({ pressed }) => (
            <View
              style={[
                styles.shutterBtn,
                { opacity: pressed ? 0.5 : 1 },
              ]}
            >
              <View style={styles.shutterBtnInner} />
            </View>
          )}
        </Pressable>
        <Pressable onPress={toggleFacing}>
          <FontAwesome6 name="rotate-left" size={32} color="white" />
        </Pressable>
      </View>
    </CameraView>
  );

  return (
    <>
      <Stack.Screen
      options={{
        headerShown: false // Optional: Set a custom title
      }}
    />
    <View style={styles.container}>
      {uri ? renderPicture() : renderCamera()}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "white",
  },
});
