import axios, { AxiosError } from 'axios';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.BASE_URL;

console.log("BASE_URL:", BASE_URL);

export interface DataEntryRequest {
    district: string;
    subdistrict: string;
    fileId: string;
  }
  
  export interface DataEntryResponse {
    imageBase64: string,
    totalPages:Number;
  }
  
  
  export const fetchImageFromBackend = async (
    payload: DataEntryRequest
  ): Promise<DataEntryResponse> => {
    try {
      const response = await fetch(`${BASE_URL}/getImageByFileId`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        // If the response is not OK, we throw a detailed error with status code and status text
        const errorDetails = await response.text(); // To get more details from the response body if available
        throw new Error(`Failed to fetch image: ${response.status} - ${response.statusText}. Response: ${errorDetails}`);
      }
  
      const data: DataEntryResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching image from backend:', error);
  
      if (error instanceof Error) {
        // Log the error message and stack trace for better debugging
        console.error('Error message:', error.message);
        console.error('Stack trace:', error.stack);
      }
  
      throw error; // Re-throw the error after logging it
    }
  };