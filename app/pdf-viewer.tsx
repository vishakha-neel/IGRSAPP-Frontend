// import React, { useState, useEffect } from 'react';
// import { View, Image, Text, Button, ActivityIndicator, Alert, Platform } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// import * as DocumentPicker from 'expo-document-picker';
// import * as FileSystem from 'expo-file-system';

// const PdfViewer = () => {
//   const [fileId, setFileId] = useState<string | null>(null);
//   const [pageCount, setPageCount] = useState<number>(0);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [imageUri, setImageUri] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const backendUrl = 'https://12b6-122-161-49-243.ngrok-free.app';

//   useEffect(() => {
//     console.log('useEffect triggered, fileId:', fileId);
//     if (fileId) {
//       console.log('Fetching first page image for fileId:', fileId);
//       fetchPageImage(1);
//     }
//   }, [fileId]);

//   const testBackend = async () => {
//     try {
//       console.log('Testing backend connection...');
//       const response = await axios.get(`${backendUrl}/health`, { timeout: 5000 });
//       console.log('Backend test response:', response.data);
//       return true;
//     } catch (error: any) {
//       console.error('Backend test failed:', error.message, 'Status:', error.response?.status, 'Data:', error.response?.data);
//       return false;
//     }
//   };

//   // const uploadPdf = async () => {
//   //   console.log('uploadPdf function called');
//   //   try {
//   //     setLoading(true);
//   //     console.log('Attempting to pick document...');
//   //     const res: any = await DocumentPicker.getDocumentAsync({
//   //       type: 'application/pdf',
//   //     });
//   //     console.log('Document picked, full response:', res);
//   //     let fileUri: string | undefined;
//   //     let fileName: string | undefined;
//   //     let fileMimeType: string | undefined;

//   //     if (res.asset) {
//   //       console.log('Using asset property:', res.asset);
//   //       fileUri = res.asset.uri;
//   //       fileName = res.asset.name;
//   //       fileMimeType = res.asset.mimeType;
//   //     } else if (res.assets && res.assets.length > 0) {
//   //       console.log('Using assets[0] property:', res.assets[0]);
//   //       fileUri = res.assets[0].uri;
//   //       fileName = res.assets[0].name;
//   //       fileMimeType = res.assets[0].mimeType;
//   //     } else {
//   //       console.log('No valid file data found in response:', res);
//   //       setLoading(false);
//   //       return;
//   //     }

//   //     if (fileUri) {
//   //       console.log('Document selection successful, uri:', fileUri, 'size:', res.assets[0]?.size || 'unknown');
//   //       // Test backend connection before upload
//   //       const isBackendReachable = await testBackend();
//   //       if (!isBackendReachable) {
//   //         Alert.alert('Error', 'Backend is not reachable. Check ngrok connection.');
//   //         setLoading(false);
//   //         return;
//   //       }

//   //       // Convert file:/// URI to a readable stream for upload
//   //       const formData = new FormData();
//   //       const fileContent = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
//   //       // formData.append('file', {
//   //       //   uri: fileUri,
//   //       //   type: fileMimeType || 'application/pdf',
//   //       //   name: fileName || `uploaded_${Date.now()}.pdf`,
//   //       //   data: `data:${fileMimeType || 'application/pdf'};base64,${fileContent}`,
//   //       // } as any);
//   //       formData.append('file', {
//   //         uri: fileUri,
//   //         name: fileName || `uploaded_${Date.now()}.pdf`,
//   //         type: fileMimeType || 'application/pdf',
//   //       } as any);
//   //       console.log('FormData prepared with base64, sending to backend:', backendUrl);
//   //       const response = await axios.post(`${backendUrl}/upload`, formData, {
//   //         headers: { 'Content-Type': 'multipart/form-data' },
//   //         timeout: 30000, // 30 seconds timeout for large files
//   //       });
//   //       console.log('Backend response:', response.data);
//   //       const [newFileId, newPageCount] = response.data.split(',');
//   //       setFileId(newFileId);
//   //       setPageCount(parseInt(newPageCount));
//   //       console.log('Updated state: fileId=', newFileId, 'pageCount=', newPageCount);
//   //       setLoading(false);
//   //     } else {
//   //       console.log('No file URI found, selection failed:', res);
//   //       setLoading(false);
//   //     }
//   //   } catch (error: any) {
//   //     console.error('Error in uploadPdf:', error.message, 'Status:', error.response?.status, 'Data:', error.response?.data);
//   //     setLoading(false);
//   //     Alert.alert('Error', 'Failed to upload PDF: ' + (error.message || 'Unknown error'));
//   //   }
//   // };

//   const uploadPdf = async () => {
//     console.log('uploadPdf function called');
//     try {
//       setLoading(true);
//       const res: any = await DocumentPicker.getDocumentAsync({
//         type: 'application/pdf',
//       });
  
//       let fileUri: string | undefined;
//       let fileName: string | undefined;
//       let fileMimeType: string | undefined;
  
//       if (res.assets && res.assets.length > 0) {
//         fileUri = res.assets[0].uri;
//         fileName = res.assets[0].name;
//         fileMimeType = res.assets[0].mimeType;
//       } else {
//         setLoading(false);
//         return;
//       }
  
//       const isBackendReachable = await testBackend();
//       if (!isBackendReachable) {
//         Alert.alert('Error', 'Backend is not reachable. Check ngrok connection.');
//         setLoading(false);
//         return;
//       }
  
//       const formData = new FormData();
//       formData.append('file', {
//         uri: fileUri,
//         type: fileMimeType || 'application/pdf',
//         name: fileName || `uploaded_${Date.now()}.pdf`,
//       } as any);
  
//       const response = await axios.post(`${backendUrl}/upload`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         // timeout: 30000,
//       });
  
//       const [newFileId, newPageCount] = response.data.split(',');
//       setFileId(newFileId);
//       setPageCount(parseInt(newPageCount));
//       setLoading(false);
//     } catch (error: any) {
//       console.error('Error in uploadPdf:', error.message, 'Status:', error.response?.status, 'Data:', error.response?.data);
//       setLoading(false);
//       Alert.alert('Error', 'Failed to upload PDF: ' + (error.message || 'Unknown error'));
//     }
//   };
//   // const fetchPageImage = async (pageNumber: number) => {
//   //   console.log('fetchPageImage called for page:', pageNumber, 'with fileId:', fileId);
//   //   try {
//   //     setLoading(true);
//   //     const response = await axios.get(`${backendUrl}/${fileId}/page/${pageNumber}`, {
//   //       responseType: 'blob',
//   //     });
//   //     console.log('Image fetch response received, status:', response.status);
//   //     const imageUrl = URL.createObjectURL(response.data);
//   //     console.log('Image URL created:', imageUrl);
//   //     setImageUri(imageUrl);
//   //     setCurrentPage(pageNumber);
//   //     setLoading(false);
//   //   } catch (error: any) {
//   //     console.error('Error in fetchPageImage:', error.message, 'Status:', error.response?.status, 'Data:', error.response?.data);
//   //     setLoading(false);
//   //     Alert.alert('Error', 'Failed to fetch page image: ' + (error.message || 'Unknown error'));
//   //   }
//   // };

//   // const fetchPageImage = async (pageNumber: number) => {
//   //   try {
//   //     setLoading(true);
//   //     const response = await axios.get(`${backendUrl}/${fileId}/page/${pageNumber}`);
//   //     const base64Image = response.data;
//   //     setImageUri(`data:image/png;base64,${base64Image}`);
//   //     setCurrentPage(pageNumber);
//   //     setLoading(false);
//   //   } catch (error: any) {
//   //     console.error('Error in fetchPageImage:', error.message, 'Status:', error.response?.status, 'Data:', error.response?.data);
//   //     setLoading(false);
//   //     Alert.alert('Error', 'Failed to fetch page image: ' + (error.message || 'Unknown error'));
//   //   }
//   // };


//   const fetchPageImage = async (pageNumber: number) => {
//     console.log('fetchPageImage called for page:', pageNumber, 'with fileId:', fileId);
//     try {
//       setLoading(true);
//       const response = await axios.get(`${backendUrl}/${fileId}/page/${pageNumber}`);
//       console.log('Base64 image data received');
//       const base64 = response.data;
//       const imageUrl = `data:image/png;base64,${base64}`;
//       setImageUri(imageUrl);
//       setCurrentPage(pageNumber);
//       setLoading(false);
//     } catch (error: any) {
//       console.error('Error in fetchPageImage:', error.message, 'Status:', error.response?.status, 'Data:', error.response?.data);
//       setLoading(false);
//       Alert.alert('Error', 'Failed to fetch page image: ' + (error.message || 'Unknown error'));
//     }
//   };

//   return (
//     <View className="flex-1 p-4 bg-gray-100">
//       <Text className="text-2xl font-bold mb-4">PDF Viewer</Text>

//       <Button title="Upload PDF" onPress={uploadPdf} />

//       {loading && <ActivityIndicator size="large" color="#0000ff" />}

//       {imageUri ? (
//         <Image
//           source={{ uri: imageUri }}
//           style={{ width: '100%', height: 400 }} // You can tweak height
//           resizeMode="contain"
//         />
//       ) : (
//         <Text>No image to display</Text>
//       )}

//       {pageCount > 0 && (
//         <View className="mt-4">
//           <Text className="text-lg">Select Page:</Text>
//           <Picker
//             selectedValue={currentPage}
//             onValueChange={(value: number) => fetchPageImage(value)}
//             className="w-full"
//           >
//             {[...Array(pageCount).keys()].map((i) => (
//               <Picker.Item key={i + 1} label={`Page ${i + 1}`} value={i + 1} />
//             ))}
//           </Picker>
//         </View>
//       )}
//     </View>
//   );
// };

// export default PdfViewer;