import React, { useState } from 'react';
import { ScrollView, View, Text, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LoginForm from '../../components/LoginLogout/LoginForm';
import styles from '../../components/LoginLogout/styles';
import { Link } from 'expo-router';

export default function HomeScreen() 
{
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isAdmin , setIsAdmin] = useState(false);

  const showLoginSuccessAlert = () => {
    Alert.alert(
      '⚠ Important Notice',
      'You are accessing sensitive government data.\n\nPlease perform all actions in this software with your own responsibility. A small mistake can lead to serious problems.\nYour all activity are under control by the admin .\n\n🚫 Do NOT share your username or password with anyone. If misused, it will be considered a criminal offense. \n\nIf you have any problem during the usage of the app then Dial Scanning Related Query 📞 +91 9311422542 Praveen Gupta (Scanning Department ) , Software Related Query 📞 +91 8979213254 Praveen Chauhan (IT Department).  \n\nBe aware and proceed with caution.',
      [
        { text: 'I Understand', onPress: () => console.log('User acknowledged the warning') },
      ],
      { cancelable: false }
    );
  };
  

  // When the login form submits successfully, you call this function
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    showLoginSuccessAlert(); // Show the alert
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Document Management System</Text>
        <Image
          source={require('../../assets/images/Chhattisgarh_logo.png')}
          style={styles.logo}
          resizeMode="contain"
          onError={(e) => console.log('Logo Load Error:', e.nativeEvent.error)}
        />
        <LinearGradient colors={['#66bfff', '#61c2ff', '#458aff']} style={styles.formSection}>
          <View style={styles.formContainer}>
            {isLoggedIn ? (
              // When the user is logged in, show the success message and a link
              <View>
                <Text style={styles.formTitle}>Home</Text>
                <View style={styles.buttonRow}>
                     <Link href={'/NRData/NRDataForm?type=NR'} style={[styles.homeButton, styles.buttonText]}>NR Data</Link>
                     <Link href={'/NRData/NRDataForm?type=DE'} style={[styles.homeButton, styles.buttonText]}>DE Data</Link>
                </View>
              </View>
            ) : (
              // If not logged in, show the login form
              <LoginForm setIsLoggedIn={handleLoginSuccess} setSessionId={setSessionId} setIsAdmin={setIsAdmin}/>
            )}
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}