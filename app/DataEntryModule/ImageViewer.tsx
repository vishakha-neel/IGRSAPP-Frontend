import { useLocalSearchParams } from 'expo-router';
import { View, Image } from 'react-native';

export default function ImageViewer() {
  const { image } = useLocalSearchParams();

  return (
    <View>
      {image && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${image}` }}
          style={{ width: '100%', height: 400 }}
          resizeMode="contain"
        />
      )}
    </View>
  );
}