import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, Button, Dimensions } from 'react-native';
import { PdfFetch } from '@/Services/NRService';
import { Link, useLocalSearchParams } from 'expo-router';

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

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>PDF Page Viewer</Text>
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
              pageNumber:pageNumber
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
              pageNumber:pageNumber
            },
                  }}
            style={styles.button}>
            Add
        </Link>
        <Link
            href={{
            pathname: "/Camera/CameraScreen",
            params: {
              fileID: fileID,
              district: district,
              subDistrict: subDistrict,
              pageNumber:pageNumber
            },
                  }}
            style={styles.button}>
            Delete
        </Link>
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
    padding: 5, // ~5px on standard screen
    borderRadius: 4,
    alignItems: 'center',
   // Optional: makes buttons flexible inside containe // spacing between buttons
  },
});

export default NRData;
