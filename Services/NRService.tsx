import axios from "axios";

export async function PdfFetch(fileID: string, district: string, subDistrict: string, pageNumber: string) {
    const backEndUrl = "https://aa1e-2401-4900-1c5c-55a-7d1e-9295-1454-1c67.ngrok-free.app/api/pdf";
    const url = `${backEndUrl}/${fileID}/${district}/${subDistrict}/${pageNumber}`;

    try {
        // Make the GET request
        const response = await axios.get(url, {
            headers: {
              'bypass-tunnel-reminder': 'true',  // This header bypasses the reminder page
                }});
        const base64 = response.data;

        if (base64.startsWith('iVBOR')) {
            const imageUrl = `data:image/png;base64,${base64}`;
            return imageUrl;
        } else {
            throw new Error('Invalid Base64 data received.');
        }
    } catch (error) {
        console.error('Error fetching PDF image:', error);
        throw new Error("Failed to load PDF image.");
    }
}