import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminSignIn = () => {
    // 1. Updated Admin Demo Credentials with @neu.edu.ph
    const adminEmail = "admin@neu.edu.ph";
    const adminPass = "admin123";

    // 2. Validation Logic
    if (email.toLowerCase() === adminEmail && password === adminPass) {
      Alert.alert("Access Granted", "Welcome to the Health Office Portal.");
      router.replace('/(tabs)/admin-dashboard'); 
    } else {
      Alert.alert(
        "Access Denied", 
        "Invalid Admin credentials. Please use the authorized health office email."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.content}>
          <Image 
            source={require('../../assets/images/neu-logo.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
          <Text style={styles.title}>Admin Portal</Text>
          <Text style={styles.subtitle}>University Health Office Sign-In</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Staff Email</Text>
            <TextInput 
              style={styles.input}
              placeholder="admin.health@neu.edu.ph"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput 
              style={styles.input}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleAdminSignIn}>
            <Text style={styles.loginBtnText}>Login as Admin</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => router.push('/')}>
            <Text style={styles.backText}>Switch to Student Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 30, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 80, height: 80, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 30 },
  inputGroup: { width: '100%', marginBottom: 20 },
  inputLabel: { fontSize: 13, fontWeight: '700', color: '#444', marginBottom: 8, alignSelf: 'flex-start' },
  input: {
    backgroundColor: '#F3F4F9',
    height: 55,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E2E4E9',
    width: '100%',
  },
  loginBtn: {
    backgroundColor: '#1A1A1A', 
    width: '100%',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  loginBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  backText: { color: '#3366FF', fontWeight: '600' }
});