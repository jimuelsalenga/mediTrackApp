import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
      {/* 1. Updated Header with NEU Logo */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image 
            source={require('../../assets/images/neu-logo.png')} 
            style={styles.neuLogoHeader} 
            resizeMode="contain" 
          />
          <Text style={styles.headerTitle}>MediTrack</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} color="#3366FF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
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
            placeholder="Lebron" // Matches your design
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
            placeholder="23-12345-678" // Matches your design
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
        >
          <Ionicons name="checkmark-circle-outline" size={20} color="#fff" style={{marginRight: 8}} />
          <Text style={styles.submitButtonText}>Submit for Verification</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  neuLogoHeader: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  scrollContent: { padding: 25 },
  mainTitle: { fontSize: 28, fontWeight: 'bold', color: '#111', marginBottom: 8 },
  subTitle: { fontSize: 14, color: '#888', marginBottom: 30, lineHeight: 20 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#999', marginBottom: 8, letterSpacing: 1 },
  textInput: {
    backgroundColor: '#F9FAFC',
    height: 55,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#EEE',
    color: '#333',
  },
  pickerContainer: {
    backgroundColor: '#F9FAFC',
    borderRadius: 12,
    borderWidth: 2,
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
    backgroundColor: '#F4F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  uploadIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E1EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  dropzoneTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  dropzoneSub: { fontSize: 12, color: '#999', marginTop: 5 },
  submitButton: {
    backgroundColor: '#8EBCFF', 
    height: 60,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 2,
  },
  submitButtonDisabled: { backgroundColor: '#D0E2FF' },
  submitButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});