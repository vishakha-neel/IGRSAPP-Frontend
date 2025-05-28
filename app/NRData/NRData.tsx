import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, Button, Dimensions, Alert, TextInput } from 'react-native';
import { PdfFetch } from '@/Services/NRService';
import { Link , Stack, useLocalSearchParams } from 'expo-router';
import { deletePage } from '@/Services/CameraService';
import { TouchableOpacity } from 'react-native';


const { width, height } = Dimensions.get('window');

const NRData = () => 
{

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState(1); // 👈 Page number state
  const [totalPage , setTotalPage]=useState("1000000");
  const [goToPage, setGoToPage] = useState('');


  // Replace with your actual dynamic data
  const {fileID , district , subDistrict , type} = useLocalSearchParams();

  useEffect(() => {
    const fetchPdfImage = async () => {
      try {
        setLoading(true);
        setError(null);
  
        let total = 0;
        const url = await PdfFetch(
          fileID.toString(),
          district.toString(),
          subDistrict.toString(),
          pageNumber.toString(),
          type.toString(),
          setTotalPage
        );
  
        setImageUrl(url);
        if (pageNumber==parseInt(totalPage)) {
          setError("This is the last PDF page.");
          return;
        }
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
  
  const handleGoToPage = () => {
    const page = parseInt(goToPage);
    if (!isNaN(page) && page >= 1 && page <= parseInt(totalPage)) {
      setPageNumber(page);
    } else {
      Alert.alert("Invalid Page", "Please enter a valid page number.");
    }
  };
  

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
               const msg= await deletePage(fileID.toString(),district.toString(),subDistrict.toString(),pageNumber.toString(),type.toString());
               Alert.alert("Response",msg);
          },
        },
      ]
    );

  }

  return (
    <>
      <Stack.Screen
      options={{
        headerShown: false // Optional: Set a custom title
      }}
    />
    <View style={styles.container}>
    <View style={styles.headerRow}>
  <View>
    <Text style={styles.heading}>PDF Viewer</Text>
    <Text style={{ color: 'grey' }}>Page: {pageNumber}</Text>
  </View>

  <View style={styles.goToContainer}>
    <TextInput
      placeholder="Page"
      placeholderTextColor="grey"
      
      value={goToPage}
      onChangeText={(e)=>setGoToPage(e)}
      keyboardType="numeric"
      style={styles.input}
    />
    <Button title="Go" onPress={handleGoToPage} />
  </View>
</View>

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
  <Link
      href={{
        pathname: "/Camera/CameraScreen",
        params: {
          fileID: fileID,
          district: district,
          subDistrict: subDistrict,
          pageNumber:pageNumber,
          source: "replace",
          type
        },
      }}
      style={[styles.smallButton, {backgroundColor: 'orange'}]}>
      <Text style={styles.buttonText}>Replace</Text>
  </Link>
  <Link
      href={{
        pathname: "/Camera/CameraScreen",
        params: {
          fileID: fileID,
          district: district,
          subDistrict: subDistrict,
          pageNumber:pageNumber,
          source: "add",
          type
        },
      }}
      style={[styles.smallButton , {backgroundColor: 'orange'}]}>
      <Text style={styles.buttonText}>Add</Text>
  </Link>
  <TouchableOpacity onPress={handleDelete} style={[styles.smallButton, {backgroundColor: 'orange'}]}>
    <Text style={styles.buttonText}>Delete</Text>
  </TouchableOpacity>
  <Button title="Previous" onPress={handlePrevious} disabled={pageNumber === 1} />
  <TouchableOpacity
    onPress={handleNext}
    disabled={pageNumber === parseInt(totalPage)}
    style={[styles.smallButton, pageNumber === parseInt(totalPage) && styles.disabledButton]}
  >
    <Text style={[styles.buttonText]}>NEXT</Text>
  </TouchableOpacity>
</View>

    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: width * 0.035, // roughly 13px on a 375px-wide screen
    marginTop: 26
  },
  heading: {
    fontSize: width * 0.053, // ~20px on standard screen
    marginBottom: height * 0.006,
    color:'grey',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: height * 0.006,
  },
  image: {
    width: '100%',
    height: height * 0.70, // 70% of screen height
    borderWidth: 2,
    borderColor: '#ccc',
    marginTop: height * 0.035,
    marginBottom: height * 0.035,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows wrapping to the next line
    justifyContent: 'center',
    gap: 10, // optional: spacing between buttons (or use margin on buttons)
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.015,
  },
  goToContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    color:'grey',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    height: 40,
    width: 70,
    marginRight: 10,
    paddingHorizontal: 8,
  },
  smallButton: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
});

export default NRData;