import { useState } from 'react';
import { useRouter } from 'expo-router';
import { fetchImageFromBackend } from './dataEntryService';
import { View, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import districtData from '../../components/districtData'; // adjust path if needed

export default function DataEntry() {
  const [district, setDistrict] = useState('');
  const [subdistrict, setSubdistrict] = useState('');
  const [fileId, setFileId] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await fetchImageFromBackend({
        district,
        subdistrict,
        fileId,
      });

      router.push({
        pathname: '/DataEntryModule/ImageViewer',
        params: { image: response.imageBase64 },
      });
    } catch (err) {
      alert('Failed to fetch image. Please try again.');
    }
  };

  const subDistrictOptions = district ? districtData[district] || [] : [];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Data Entry</Text>

      <Text style={styles.label}>District:</Text>
      <Picker
        selectedValue={district}
        onValueChange={(value) => {
          setDistrict(value);
          setSubdistrict('');
        }}
        style={styles.picker}
      >
        <Picker.Item label="Select District" value="" />
        {Object.keys(districtData).map((dist) => (
          <Picker.Item label={dist} value={dist} key={dist} />
        ))}
      </Picker>

      <Text style={styles.label}>Subdistrict:</Text>
      <Picker
        selectedValue={subdistrict}
        onValueChange={(value) => setSubdistrict(value)}
        style={styles.picker}
        enabled={!!district}
      >
        <Picker.Item label="Select Subdistrict" value="" />
        {subDistrictOptions.map((sub) => (
          <Picker.Item label={sub.name} value={sub.name} key={sub.name} />
        ))}
      </Picker>

      <Text style={styles.label}>File ID:</Text>
      <TextInput
        style={styles.input}
        value={fileId}
        onChangeText={setFileId}
        placeholder="Enter File ID"
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
