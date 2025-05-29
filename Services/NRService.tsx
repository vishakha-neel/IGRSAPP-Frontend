import axios from "axios";
import Constants from 'expo-constants';

type FileResponse = {
    data:{
    imageBase64: string;
    totalPages: string;
    }
  };

export async function PdfFetch(fileID: string, district: string, subDistrict: string, pageNumber: string , type:string , setTotalPage :(count: string) => void ) {
    const BASE_URL = Constants.expoConfig?.extra?.BASE_URL; // Replace with correct ngrok or prod URL
    const url = `${BASE_URL}/api/pdf/${fileID}/${district}/${subDistrict}/${pageNumber}`;
    const url2= `${BASE_URL}/getImageByFileId`

    try {

        let response:FileResponse = {data:{imageBase64:'',totalPages:''}};
        let base64 = '';

        if(type==='DE')
        {
            const requestBody = {
                fileId: fileID,
                district: district,
                subdistrict: subDistrict,
                pageNumber : pageNumber
              };
              response = await axios.post(url2, requestBody, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });

              base64 = response.data.imageBase64;
              setTotalPage(response.data.totalPages);
        }
        else
        {
            response = await axios.get(url);
            base64 = response.data.imageBase64;
            setTotalPage(response.data.totalPages);
        }

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