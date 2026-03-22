import { router } from 'expo-router';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StudentLoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // The helper credentials shown in the new UI
  const handleHelperFill = () => {
    setEmail('student@neu.edu.ph');
    setPassword('student123');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        {/* Main Card Container with Shadow and Blue Top-Border */}
        <View style={styles.loginCard}>
          
          {/* Logo, Title, and Description Section */}
          <View style={styles.headerSection}>
            <Image 
              source={require('../../assets/neu-logo.png')} // MAKE SURE THIS FILE EXISTS
              style={styles.logo} 
              resizeMode="contain" 
            />
            <Text style={styles.titleText}>MediTrack</Text>
            <Text style={styles.descriptionText}>
              New Era University Student Medical Record System
            </Text>
          </View>

          {/* Email Input Field with Outer Label */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="student@neu.edu.ph"
              placeholderTextColor="#999"
              style={styles.textInput}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password Input Field with Outer Label */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#999"
              style={styles.textInput}
              secureTextEntry={true} // Hides the password
            />
          </View>

          {/* Elevated Blue Sign In Button */}
          <TouchableOpacity 
            style={styles.signInButton} 
            onPress={() => router.replace('/(tabs)')} // Navigates to the main tab screen
            activeOpacity={0.8}
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          {/* Admin Redirect Link (Moved and styled like the new UI) */}
          <TouchableOpacity onPress={handleHelperFill} style={styles.helperTextLink}>
            <Text style={styles.helperText}>Use: student@neu.edu.ph / student123</Text>
          </TouchableOpacity>
          
          {/* The original 'Admin?' link from the first image - can be kept small at bottom */}
          <TouchableOpacity onPress={() => router.push('/admin-login')} style={styles.adminLinkContainer}>
              <Text style={styles.adminLinkText}>Are you an Admin? Login here</Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Pure white background
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  // The central elevated login card
  loginCard: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 400, // Keeps it from stretching on tablets
    padding: 25,
    borderRadius: 15,
    borderTopWidth: 4, 
    borderTopColor: '#3366FF', // The blue top accent
    // Android Shadow (elevation)
    elevation: 8,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  // Logo and Text Header styles
  headerSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 18,
  },
  // General Input Field group styles
  inputGroup: {
    marginBottom: 15,
    width: '100%',
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginLeft: 4, // Slight indent for the label
  },
  textInput: {
    backgroundColor: '#F7F8FC', // Very light gray fill
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E8E8E8', // Light border
  },
  // The main elevated button styles
  signInButton: {
    backgroundColor: '#3366FF', // Vivid Blue
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    // Button Shadow
    shadowColor: '#3366FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  signInButtonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
  },
  // The special link to auto-fill (as seen in new UI)
  helperTextLink: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  helperText: {
    fontSize: 13,
    color: '#A0A0A0', // Lighter grey helper text
  },
  // Small admin link below (to match the overall file functionality)
  adminLinkContainer: {
    alignSelf: 'center',
    marginTop: 5,
  },
  adminLinkText: {
    fontSize: 13,
    color: '#3366FF',
    textDecorationLine: 'underline',
  },
});