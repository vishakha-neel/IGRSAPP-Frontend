import axios from "axios";

export async function PdfFetch(fileID: string, district: string, subDistrict: string, pageNumber: string) {
    const backEndUrl = " https://aa1e-2401-4900-1c5c-55a-7d1e-9295-1454-1c67.ngrok-free.app/api/pdf"; // Replace with correct ngrok or prod URL
    const url = `${backEndUrl}/${fileID}/${district}/${subDistrict}/${pageNumber}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'bypass-tunnel-reminder': 'true',
            }
        });

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
