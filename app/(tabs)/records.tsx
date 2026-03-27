import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function UploadRecordsScreen() {
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [fileType, setFileType] = useState('Select');
  const [fileName, setFileName] = useState<string | null>(null);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/*'],
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      setFileName(result.assets[0].name);
    }
  };

  const handleSubmit = () => {
    if (fileType === 'Select') {
      Alert.alert("Selection Required", "Please select a file type (X-Ray or Physical Exam).");
      return;
    }
    if (!fileName) {
      Alert.alert("Missing File", "Please upload a document before submitting.");
      return;
    }
    Alert.alert("Success", `Your ${fileType} has been submitted for verification.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Unified Header - Matches Student Dashboard */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image 
            source={require('../../assets/images/neu-logo.png')} 
            style={styles.logoSmall} 
            resizeMode="contain" 
          />
          <View>
            <Text style={styles.headerTitle}>MediTrack</Text>
            <Text style={styles.headerSubtitle}>NEU Health Portal</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => router.push('/notifications')}
          >
            <Ionicons name="notifications-outline" size={26} color="#3366FF" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.profileButton} 
            onPress={() => router.push('/profile')}
          >
            <Ionicons name="person-circle-outline" size={32} color="#3366FF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.mainTitle}>Upload Records</Text>
        <Text style={styles.subTitle}>
          Securely submit your medical files for verification by the health center.
        </Text>

        {/* Full Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>FULL NAME</Text>
          <TextInput 
            style={styles.textInput}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter Full Name"
            placeholderTextColor="#AAA"
          />
        </View>

        {/* Student ID Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>STUDENT ID</Text>
          <TextInput 
            style={styles.textInput}
            value={studentId}
            onChangeText={setStudentId}
            placeholder="00-00000-000"
            placeholderTextColor="#AAA"
          />
        </View>

        {/* File Type Dropdown */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>FILE TYPE</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={fileType}
              onValueChange={(itemValue) => setFileType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select file type..." value="Select" color="#999" />
              <Picker.Item label="X-Ray" value="X-Ray" />
              <Picker.Item label="Physical Exam" value="Physical Exam" />
            </Picker>
          </View>
        </View>

        {/* Upload Dropzone */}
        <TouchableOpacity style={styles.dropzone} onPress={pickDocument}>
          <View style={styles.uploadIconCircle}>
            <Ionicons name="cloud-upload-outline" size={32} color="#3366FF" />
          </View>
          <Text style={styles.dropzoneTitle}>
            {fileName ? fileName : 'Drop or Upload your file'}
          </Text>
          <Text style={styles.dropzoneSub}>
            Supports PDF, JPG, or PNG (Max 15MB)
          </Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity 
          style={[styles.submitButton, !fileName && styles.submitButtonDisabled]} 
          onPress={handleSubmit}
          activeOpacity={0.7}
        >
          <Ionicons name="checkmark-circle-outline" size={20} color="#fff" style={{marginRight: 8}} />
          <Text style={styles.submitButtonText}>Submit for Verification</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F2F6FF', // Switched to match Dashboard background
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E4E8',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  logoSmall: { width: 40, height: 40, marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  headerSubtitle: { fontSize: 10, color: '#3366FF', fontWeight: 'bold', textTransform: 'uppercase' },
  iconButton: { padding: 5, marginRight: 10 },
  profileButton: { padding: 5 },
  scrollContent: { padding: 25 },
  mainTitle: { fontSize: 28, fontWeight: 'bold', color: '#111', marginBottom: 8 },
  subTitle: { fontSize: 14, color: '#666', marginBottom: 30, lineHeight: 20 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#999', marginBottom: 8, letterSpacing: 1 },
  textInput: {
    backgroundColor: '#fff',
    height: 55,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#EEE',
    color: '#333',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#3366FF',
    overflow: 'hidden',
  },
  picker: { height: 55, width: '100%' },
  dropzone: {
    height: 180,
    borderWidth: 2,
    borderColor: '#B0D0FF',
    borderStyle: 'dashed',
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  uploadIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  dropzoneTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  dropzoneSub: { fontSize: 12, color: '#999', marginTop: 5 },
  submitButton: {
    backgroundColor: '#3366FF',
    height: 60,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  submitButtonDisabled: { backgroundColor: '#D0E2FF' },
  submitButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});