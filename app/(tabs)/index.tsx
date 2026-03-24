import { Ionicons } from '@expo/vector-icons'; // Added for the admin icon
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');

  const programs = [
    "Bachelor of Elementary Education", "Bachelor of Secondary Education",
    "BS in Accountancy", "BS in Accounting Information System",
    "BS in Accounting Technology", "BS in Business Administration",
    "BS in Entrepreneurship", "BS in Real Estate Management",
    "BS in Computer Science", "BS in Entertainment and Multimedia Computing",
    "BS in Information Systems", "BS in Information Technology",
    "BS in Medical Technology", "BS in Nursing", "BS in Physical Therapy",
    "BS in Respiratory Therapy", "BS in Civil Engineering",
    "BS in Electrical Engineering", "BS in Electronics Engineering",
    "BS in Industrial Engineering", "BS in Mechanical Engineering",
    "Bachelor of Music", "Bachelor of Music Major in Music Education",
    "BS in Astronomy", "BS in Biology", "BS in Criminology",
    "BS in Foreign Service", "BS in Psychology",
    "Bachelor of Library and Information Science",
    "Bachelor of Public Administration", "BS in Architecture"
  ];

  const handleSignIn = () => {
    if (!selectedProgram) {
      Alert.alert("Selection Required", "Please select your undergraduate program first.");
      return;
    }

    const demoEmail = "student@neu.edu.ph";
    const demoPassword = "student123";

    if (email.toLowerCase() === demoEmail && password === demoPassword) {
      router.replace('/(tabs)/dashboard'); 
    } else {
      Alert.alert(
        "Invalid Credentials", 
        "The email or password you entered is incorrect. Please use the authorized institutional account."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.loginCard}>
            
            <View style={styles.headerSection}>
              <Image 
                source={require('../../assets/images/neu-logo.png')} 
                style={styles.logo} 
                resizeMode="contain" 
              />
              <Text style={styles.titleText}>MediTrack</Text>
              <Text style={styles.descriptionText}>New Era University Student Medical Record System</Text>
            </View>

            {/* ... Undergraduate Program Picker ... */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Undergraduate Program</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={selectedProgram}
                  onValueChange={(itemValue) => setSelectedProgram(itemValue)}
                  style={styles.picker}
                  dropdownIconColor="#3366FF"
                >
                  <Picker.Item label="Select your program..." value="" color="#999" />
                  {programs.map((prog, index) => (
                    <Picker.Item key={index} label={prog} value={prog} />
                  ))}
                </Picker>
              </View>
            </View>

            {/* ... Institutional Email Input ... */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Institutional Email</Text>
              <TextInput 
                value={email} 
                onChangeText={setEmail} 
                placeholder="student@neu.edu.ph" 
                style={styles.textInput} 
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* ... Password Input ... */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput 
                value={password} 
                onChangeText={setPassword} 
                placeholder="••••••••" 
                style={styles.textInput} 
                secureTextEntry 
              />
            </View>

            <TouchableOpacity 
              style={[styles.signInButton, !selectedProgram && styles.buttonDisabled]} 
              onPress={handleSignIn}
              activeOpacity={0.8}
            >
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>

            {/* 1. Admin Access Button */}
            <TouchableOpacity 
              style={styles.adminAccessButton}
              onPress={() => router.push('/(tabs)/admin-login')}
            >
              <Ionicons name="shield-checkmark-outline" size={16} color="#666" style={{ marginRight: 6 }} />
              <Text style={styles.adminAccessText}>Access Health Office Portal</Text>
            </TouchableOpacity>

            <Text style={styles.footerNote}>
              Note: Your program helps medical staff verify specific requirements.
            </Text>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  loginCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20,
    borderTopWidth: 5,
    borderTopColor: '#3366FF',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  headerSection: { alignItems: 'center', marginBottom: 25 },
  logo: { width: 90, height: 90, marginBottom: 12 },
  titleText: { fontSize: 28, fontWeight: 'bold', color: '#1A1A1A' },
  descriptionText: { fontSize: 13, color: '#777', textAlign: 'center', marginTop: 4 },
  inputGroup: { marginBottom: 18 },
  inputLabel: { fontSize: 14, fontWeight: '700', color: '#444', marginBottom: 8 },
  pickerWrapper: {
    backgroundColor: '#F3F4F9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E4E9',
    overflow: 'hidden',
  },
  picker: { height: 50, width: '100%' },
  textInput: {
    backgroundColor: '#F3F4F9',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#E2E4E9',
  },
  signInButton: {
    backgroundColor: '#3366FF',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#3366FF',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: { backgroundColor: '#A0B4FF' },
  signInButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 17 },
  
  // 2. Added Admin Button Styles
  adminAccessButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
  },
  adminAccessText: {
    color: '#666',
    fontSize: 13,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  footerNote: { 
    textAlign: 'center', 
    fontSize: 11, 
    color: '#AAA', 
    marginTop: 15, 
    fontStyle: 'italic' 
  },
});