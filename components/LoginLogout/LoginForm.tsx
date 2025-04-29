import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { fetchCaptcha, handleLogin } from './authservice';
import styles from './styles';

interface LoginFormProps {
  setIsLoggedIn: (value: boolean) => void;
  setSessionId: (value: string | null) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setIsLoggedIn, setSessionId }) => {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [captcha, setCaptcha] = useState<string>('');
  const [captchaImage, setCaptchaImage] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    fetchCaptcha(setCaptchaImage, setSessionId, setMessage);
  }, []);

  const onLogin = async () => {
    const { success, sessionId: newSessionId, message } = await handleLogin(userId, password, captcha);
    setMessage(message);
    if (success) {
      setIsLoggedIn(true);
      setSessionId(newSessionId);
      setUserId('');
      setPassword('');
      setCaptcha('');
      fetchCaptcha(setCaptchaImage, setSessionId, setMessage);
    }
  };

  return (
    <View>
      <Text style={styles.formTitle}>Login</Text>
      <Text style={styles.errorMessage}>{message}</Text>
      <Text style={styles.label}>USER-NAME</Text>
      <TextInput style={styles.input} placeholder="Enter User ID" value={userId} onChangeText={setUserId} />
      <Text style={styles.label}>PASSWORD</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
          <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
        </TouchableOpacity>
      </View>
      {captchaImage ? (
        <Image source={{ uri: captchaImage }} style={styles.captchaImage} resizeMode="contain" />
      ) : (
        <Text>Loading CAPTCHA...</Text>
      )}
      <TouchableOpacity onPress={() => fetchCaptcha(setCaptchaImage, setSessionId, setMessage)}>
        <Text style={styles.refreshText}>Refresh CAPTCHA</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Captcha</Text>
      <TextInput style={styles.input} placeholder="Enter CAPTCHA" value={captcha} onChangeText={setCaptcha} />
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;