import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

const NRDataFrom = () => {
  const [fileID, setFileID] = useState('');
  const [district, setDistrict] = useState('');
  const [subDistrict, setSubDistrict] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (!fileID.trim()) {
      Alert.alert('Validation Error', 'Please enter a File ID');
      return;
    }

    router.push({ pathname: '/NRData/NRData', params: { fileID } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter File ID:</Text>
      <TextInput
        style={styles.input}
        value={fileID}
        onChangeText={setFileID}
        placeholder="e.g.,1234RG764"
      />

<Text style={styles.label}>Select District:</Text>
      <Picker
        selectedValue={district}
        style={styles.picker}
        onValueChange={(itemValue) => setDistrict(itemValue)}
      >
        <Picker.Item label="Balod" value="Raipur" />
        <Picker.Item label="BalodaBazar" value="Bilaspur" />
        <Picker.Item label="Bastar" value="Durg" />
        <Picker.Item label="Bemetara" value="Raipur" />
        <Picker.Item label="Bilaspur" value="Bilaspur" />
        <Picker.Item label="Dantewada" value="Durg" />
        <Picker.Item label="Dhamtari" value="Raipur" />
        <Picker.Item label="Durg" value="Bilaspur" />
        <Picker.Item label="Gariyaband" value="Durg" />
        <Picker.Item label="JanjgirChampa" value="Raipur" />
        <Picker.Item label="Jashpur" value="Bilaspur" />
        <Picker.Item label="Kanker" value="Durg" />
        <Picker.Item label="Korba" value="Raipur" />
        <Picker.Item label="Koriya" value="Bilaspur" />
        <Picker.Item label="Mahasamund" value="Durg" />
        <Picker.Item label="Mungeli" value="Raipur" />
        <Picker.Item label="Raigarh" value="Bilaspur" />
        <Picker.Item label="Raipur" value="Durg" />
        <Picker.Item label="Mungeli" value="Raipur" />
        <Picker.Item label="Raigarh" value="Bilaspur" />
        <Picker.Item label="Raipur" value="Durg" />
      </Picker>

      <Text style={styles.label}>Select Subdistrict:</Text>
      <Picker
        selectedValue={subDistrict}
        style={styles.picker}
        onValueChange={(itemValue) => setSubDistrict(itemValue)}
      >
        <Picker.Item label="Abhanpur" value="Abhanpur" />
        <Picker.Item label="Tilda" value="Tilda" />
        <Picker.Item label="Arang" value="Arang" />
      </Picker>


      <Button title="Search File" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 100,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginVertical: 10,
  }
});

export default NRDataFrom;