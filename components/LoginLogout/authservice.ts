import axios, { AxiosError } from 'axios';
// import { sha512 } from 'js-sha512';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.BASE_URL;

console.log("BASE_URL:", BASE_URL);


export const fetchCaptcha = async (
  setCaptchaImage: (value: string) => void,
  setSessionId: (value: string | null) => void,
  setMessage: (value: string) => void
) => {
  const captchaUrl = `${BASE_URL}/captcha`;
  try {
    const response = await axios.get(captchaUrl, {
      headers: { 'Accept': 'application/json' },
      timeout: 5000,
    });
    const captchaData = response.data.captchaImage;
    if (!captchaData) throw new Error('No captchaImage field in response');
    const base64Image = captchaData.startsWith('data:image/')
      ? captchaData
      : `data:image/jpeg;base64,${captchaData}`;
    setCaptchaImage(base64Image);
    setSessionId(response.data.sessionId || null);
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? (error as AxiosError).message
      : (error instanceof Error ? error.message : 'Unknown error');
    setMessage(`Failed to load CAPTCHA: ${errorMessage}`);
  }
};

export const handleLogin = async (userId: string, password: string, captcha: string) => {
  // const hashedPassword = sha512(password);
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      userId,
      password: password,
      captcha,
    }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return { success: response.data.success, sessionId: response.data.sessionId, message: response.data.message };
  } catch (error) {
    return { success: false, message: axios.isAxiosError(error) ? error.message : 'Unknown error' };
  }
};

export const handleLogout = async (sessionId: string | null) => {
  try {
    const response = await axios.get(`${BASE_URL}/logout`, {
      headers: { 'Cookie': `JSESSIONID=${sessionId}` },
    });
    return { message: response.data.message };
  } catch (error) {
    return { message: axios.isAxiosError(error) ? error.message : 'Unknown error' };
  }
};