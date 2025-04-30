import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { PdfFetch } from '@/Services/NRService';
import { Link } from 'expo-router';

const NRData = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hardcoded example parameters - replace with your own dynamic data
  const fileID = "12345";
  const district = "DemoDistrict";
  const subDistrict = "SubDemo";
  const pageNumber = "1";

  useEffect(() => {
    const fetchPdfImage = async () => {
      try {
        setLoading(true);
        const url = await PdfFetch(fileID, district, subDistrict, pageNumber);
        setImageUrl(url);
      } catch (err) {
        setError("Failed to load PDF image.");
      } finally {
        setLoading(false);
      }
    };

    fetchPdfImage();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>PDF Page Viewer</Text>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.error}>{error}</Text>}
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
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
  },
});

export default NRData;
