import React, { useState } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LoginForm from '../../components/LoginLogout/LoginForm';
import styles from '../../components/LoginLogout/styles';

export default function HomeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

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
              // <DataSelector sessionId={sessionId} setIsLoggedIn={setIsLoggedIn} setSessionId={setSessionId} />
              <Text > You have Success fully Logged in</Text>
            ) : (
              <LoginForm setIsLoggedIn={setIsLoggedIn} setSessionId={setSessionId} />
            )}
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}
