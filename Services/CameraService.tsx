import axios from 'axios';
import Constants from 'expo-constants';

export default async function uploadImage(fileID: string , district: string, subDistrict: string, pageNumber: string , uri :string) {

const BASE_URL = Constants.expoConfig?.extra?.BASE_URL; // Replace with correct ngrok or prod URL
const url = `${BASE_URL}/api/pdf/${fileID}/${district}/${subDistrict}/${pageNumber}`;

if (!uri) return false;

  const formData = new FormData();
  formData.append('file', {
    uri,
    name: 'photo.jpg',
    type: 'image/jpeg',
  } as any); // "as any" if using TypeScript for React Native

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.status === 200;
  } catch (error) {
    console.error('Upload error:', error);
    return false;
  }
};
