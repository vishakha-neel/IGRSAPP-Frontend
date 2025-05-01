import axios from "axios";
import Constants from 'expo-constants';

export async function PdfFetch(fileID: string, district: string, subDistrict: string, pageNumber: string) {
    const BASE_URL = Constants.expoConfig?.extra?.BASE_URL; // Replace with correct ngrok or prod URL
    const url = `${BASE_URL}/api/pdf/${fileID}/${district}/${subDistrict}/${pageNumber}`;

    try {
        const response = await axios.get(url);

        const base64 = response.data;

        if (base64.startsWith('iVBOR')) {
            const imageUrl = `data:image/png;base64,${base64}`;
            return imageUrl;
        } else {
            throw new Error('Invalid Base64 data received.');
        }

    } catch (error: any) {
        // Extract backend error message from JSON body if present
        const backendMessage = error?.response?.data?.message || error.message;
        throw new Error(backendMessage || "Failed to load PDF image.");
    }
}
