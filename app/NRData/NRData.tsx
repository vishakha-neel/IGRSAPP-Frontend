import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { PdfFetch } from '@/Services/NRService';
import { Link, useLocalSearchParams } from 'expo-router';

const NRData = () => 
{
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1); // 👈 Page number state

  // Replace with your actual dynamic data
  const {fileID} = useLocalSearchParams();
  const district = "DemoDistrict";
  const subDistrict = "SubDemo";

  useEffect(() => {
    const fetchPdfImage = async () => {
      try {
        setLoading(true);
        setError(null);
        const url = await PdfFetch(fileID[0], district, subDistrict, pageNumber.toString());
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
        <Button title="Next" onPress={handleNext} />
      </View>

      <Link href="/pdf-viewer">Go to About</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 13,
  },
  heading: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 700,
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default NRData;
