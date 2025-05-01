import {
    CameraType,
    CameraView,
    useCameraPermissions,
  } from "expo-camera";
  import { useRef, useState } from "react";
  import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
  import { Image } from "expo-image";
  import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useLocalSearchParams } from "expo-router";
import uploadImage from "@/Services/CameraService";
  
  export default function App() 
  {

    const { fileID, district, subDistrict, pageNumber} = useLocalSearchParams();
    const [permission, requestPermission] = useCameraPermissions();
    const ref = useRef<CameraView>(null);
    const [uri, setUri] = useState<string | null | undefined>(null);
    const [facing, setFacing] = useState<CameraType>("back");
  
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
  
    const takePicture = async () => {
      const photo = await ref.current?.takePictureAsync();
      setUri(photo?.uri);
    };
  
    const toggleFacing = () => {
      setFacing((prev) => (prev === "back" ? "front" : "back"));
    };
  
const sendToBackend = async () => {
  if (!uri) return;

  const success = await uploadImage(fileID.toString() , district.toString() , subDistrict.toString() , pageNumber.toString() ,uri);

  if (success) {
    Alert.alert('Image uploaded successfully!');
    setUri(null);
  } else {
    Alert.alert('Error uploading image');
  }
};
  
    const renderPicture = () => (
      <View style={{ alignItems: "center" }}>
        <Image
          source={{ uri }}
          contentFit="contain"
          style={{ width: 300, aspectRatio: 1, marginBottom: 10 }}
        />
        <Button onPress={() => setUri(null)} title="Retake" />
        <Button onPress={sendToBackend} title="OK (Send to Server)" />
      </View>
    );
  
    const renderCamera = () => (
      <CameraView
        style={styles.camera}
        ref={ref}
        facing={facing}
        mute={false}
        responsiveOrientationWhenOrientationLocked
      >
        <View style={styles.shutterContainer}>
          <View style={{ width: 32 }} /> {/* Empty space to balance layout */}
          <Pressable onPress={takePicture}>
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
  
    return <View style={styles.container}>{uri ? renderPicture() : renderCamera()}</View>;
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
  