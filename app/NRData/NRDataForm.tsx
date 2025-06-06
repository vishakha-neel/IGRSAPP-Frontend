import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Dimensions
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import districtData from '@/MetaData/districtMetaData';

const { width, height } = Dimensions.get('window');

const NRDataFrom = () => {

  const { type } = useLocalSearchParams();
  const [fileID, setFileID] = useState('');
  const [district, setDistrict] = useState(Object.keys(districtData)[0]);
  const [subDistrict, setSubDistrict] = useState(
    districtData[Object.keys(districtData)[0]][0].name
  );
  const router = useRouter();

  useEffect(() => 
    {
    if (district && districtData[district]) {
      setSubDistrict(districtData[district][0].name);
    }
  }, [district]);

  const handleSubmit = () => {
    if (!fileID.trim()) {
      Alert.alert('Validation Error', 'Please enter a File ID');
      return;
    }
    router.push({
      pathname: '/NRData/NRData',
      params: { fileID, district, subDistrict , type},
    });
  };

  return (
    <>
    <Stack.Screen
      options={{
        headerShown: false // Optional: Set a custom title
      }}
    />

    <View style={styles.container}>
      <Text style={styles.label}>Enter File ID:</Text>
      <TextInput
        style={styles.input}
        value={fileID}
        onChangeText={setFileID}
        placeholder="e.g.,1234RG764"
      />

      <View style={styles.pickerContainer}>
      <Text style={styles.label}>Select District:</Text>
      <Picker
        selectedValue={district}
        style={styles.picker}
        onValueChange={(value) => setDistrict(value)}
      >
        {Object.keys(districtData).map((dist) => (
          <Picker.Item key={dist} label={dist} value={dist} />
        ))}
      </Picker>
      </View>

      <View style={styles.pickerContainer}>
      <Text style={styles.label}>Select Subdistrict:</Text>
      <Picker
        selectedValue={subDistrict}
        style={styles.picker}
        onValueChange={(value) => setSubDistrict(value)}
      >
        {districtData[district].map((sub) => (
          <Picker.Item key={sub.code} label={sub.name} value={sub.name} />
        ))}
      </Picker>
      </View>

      <Button title="Search File" onPress={handleSubmit}/>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: width * 0.05, // 5% of screen width
    marginTop: height * 0.1, // 10% of screen height
  },
  label: {
    fontSize: width * 0.045, // ~18px on standard screen
    marginBottom: height * 0.015,
    color:'orange'
  },
  input: {
    color:'grey',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: width * 0.035,
    marginBottom: height * 0.025,
  },
  picker: {
    height: height * 0.065, // Around 50px
    width: '100%',
    marginBottom: height * 0.025,
    color:'grey'
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    height: height * 0.065,
    width: '100%',
    marginTop: height * 0.045,
    marginBottom: height * 0.025,
    justifyContent: 'center',
  },
});

export default NRDataFrom;