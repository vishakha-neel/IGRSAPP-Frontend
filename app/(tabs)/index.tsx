import React, { useState } from 'react';
import { TouchableOpacity,ScrollView, View, Text, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LoginForm from '../../components/LoginLogout/LoginForm';
import styles from '../../components/LoginLogout/styles';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const showLoginSuccessAlert = () => {
    Alert.alert(
      'Login Successful',
      'You have successfully logged in!',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
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
                     <Link href={'/NRData/NRDataForm'} style={[styles.homeButton, styles.buttonText]}>NR Data</Link>
                     <Link href={'/NRData/NRData'} style={[styles.homeButton, styles.buttonText]}>DE Data</Link>
                </View>
                   <Link href="/DataEntryModule/DataEntry" asChild>
                      <TouchableOpacity style={{ backgroundColor: '#3b82f6', padding: 10, borderRadius: 6, marginTop: 10 }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>Go to Data Entry</Text>
                      </TouchableOpacity>
                    </Link>
              </View>
            ) : (
              // If not logged in, show the login form
              <LoginForm setIsLoggedIn={handleLoginSuccess} setSessionId={setSessionId} />
            )}
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}
