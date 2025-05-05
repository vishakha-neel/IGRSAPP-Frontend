import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, Button, Dimensions, Alert } from 'react-native';
import { PdfFetch } from '@/Services/NRService';
import { Link, useLocalSearchParams } from 'expo-router';
import { deletePage } from '@/Services/CameraService';

const { width, height } = Dimensions.get('window');

const NRData = () => 
{
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1); // 👈 Page number state

  // Replace with your actual dynamic data
  const {fileID , district , subDistrict} = useLocalSearchParams();

  useEffect(() => {
    const fetchPdfImage = async () => {
      try {
        setLoading(true);
        setError(null);
        const url = await PdfFetch(fileID.toString(), district.toString(), subDistrict.toString(), pageNumber.toString());
        setImageUrl(url);
      } catch (err: any) {
        const msg = err?.message || "Failed to load PDF image.";
        if (msg.includes("Invalid page number")) {
          setError("This page is not available in the PDF.");
        } else {
          setError("Failed to load PDF image.");
        }
        setImageUrl(null);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPdfImage();
  }, [pageNumber]);
  

  const handleNext = () => {
    setPageNumber(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (pageNumber > 1) {
      setPageNumber(prev => prev - 1);
    }
  };

  const handleDelete = () =>{
    Alert.alert(
      "Confirm",
      "Do you want to delete the page from the original pdf .?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async() => {
               const msg= await deletePage(fileID.toString(),district.toString(),subDistrict.toString(),pageNumber.toString());
               Alert.alert("Response",msg);
          },
        },
      ]
    );

  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>PDF Viewer</Text>
      <Text>Page: {pageNumber}</Text>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.error}>{error}</Text>}

      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Previous" onPress={handlePrevious} disabled={pageNumber === 1} />
        <Link
            href={{
            pathname: "/Camera/CameraScreen",
            params: {
              fileID: fileID,
              district: district,
              subDistrict: subDistrict,
              pageNumber:pageNumber,
              source: "replace"
            },
                  }}
            style={styles.button}>
            Replace
        </Link>
        <Link
            href={{
            pathname: "/Camera/CameraScreen",
            params: {
              fileID: fileID,
              district: district,
              subDistrict: subDistrict,
              pageNumber:pageNumber,
              source: "add"
            },
                  }}
            style={styles.button}>
            Add
        </Link>
        <Button onPress={handleDelete}  title="Delete" />
        <Button title="Next" onPress={handleNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: width * 0.035, // roughly 13px on a 375px-wide screen
  },
  heading: {
    fontSize: width * 0.053, // ~20px on standard screen
    marginBottom: height * 0.006,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: height * 0.006,
  },
  image: {
    width: '100%',
    height: height * 0.7, // 70% of screen height
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: height * 0.015,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.015,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 6, // ~5px on standard screen
    borderRadius: 4,
    alignItems: 'center',
    color:'white'
   // Optional: makes buttons flexible inside containe // spacing between buttons
  },
});

export default NRData;
