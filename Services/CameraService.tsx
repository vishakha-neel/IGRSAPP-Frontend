import axios from 'axios';
import Constants from 'expo-constants';

export default async function uploadImage(fileID: string , district: string, subDistrict: string, pageNumber: string , uri :string , type:string) {

const BASE_URL = Constants.expoConfig?.extra?.BASE_URL; // Replace with correct ngrok or prod URL
const url = `${BASE_URL}/api/pdf/${fileID}/${district}/${subDistrict}/${pageNumber}/${type}`;

if (!uri) return "Image Not Clicked Properly";

  const formData = new FormData();

  formData.append('file', {
    uri,
    name: 'photo.jpg',
    type: 'image/jpeg'
  } as any); // "as any" if using TypeScript for React Native

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Upload error:', error);
    return "Error Occured";
  }
};


export async function addImage(fileID: string , district: string, subDistrict: string, pageNumber: string , uri :string , type:string) {

const BASE_URL = Constants.expoConfig?.extra?.BASE_URL; // Replace with correct ngrok or prod URL
const url = `${BASE_URL}/api/pdf/add/${fileID}/${district}/${subDistrict}/${pageNumber}/${type}`;

if (!uri) return "Image Not Clicked Properly";

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
    return response.data;
  } catch (error) {
    console.error('Upload error:', error);
    return "Error occured";
  }
};


export async function deletePage(fileID: string , district: string, subDistrict: string, pageNumber: string,type :string) {

  const BASE_URL = Constants.expoConfig?.extra?.BASE_URL; // Replace with correct ngrok or prod URL
  const url = `${BASE_URL}/api/pdf/delete/${fileID}/${district}/${subDistrict}/${pageNumber}/${type}`;
  
    try {
      const response = await axios.post(url);
      return response.data;
    } catch (error) {
      console.error('Upload error:', error);
      return false;
    }
  };