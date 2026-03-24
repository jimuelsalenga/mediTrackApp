import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AdminDashboard() {
  const [selectedFilter, setSelectedFilter] = useState('All Programs');

  const programs = [
    "All Programs", "BS in Information Technology", "BS in Computer Science",
    "BS in Nursing", "BS in Accountancy", "BS in Architecture"
  ];

  // Demo Data for students
  const studentRecords = [
    { id: '2023-001', name: 'Juan Dela Cruz', program: 'BS in Information Technology', xray: 'Pending', physical: 'Approved' },
    { id: '2023-002', name: 'Maria Santos', program: 'BS in Nursing', xray: 'Approved', physical: 'Approved' },
    { id: '2023-003', name: 'Mark Ramos', program: 'BS in Information Technology', xray: 'Denied', physical: 'Pending' },
  ];

  // Filter logic based on the Picker selection
  const filteredStudents = selectedFilter === 'All Programs' 
    ? studentRecords 
    : studentRecords.filter(s => s.program === selectedFilter);

  const handleUpdateStatus = (name: string, type: string) => {
    Alert.alert("Status Updated", `Successfully updated ${type} for ${name}.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Program Filter Section */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Filter by Program:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedFilter}
            onValueChange={(itemValue) => setSelectedFilter(itemValue)}
            style={styles.picker}
          >
            {programs.map((prog, index) => (
              <Picker.Item key={index} label={prog} value={prog} />
            ))}
          </Picker>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredStudents.map((student) => (
          <View key={student.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={styles.studentId}>{student.id} | {student.program}</Text>
              </View>
              <Ionicons name="person-circle" size={32} color="#3366FF" />
            </View>

            <View style={styles.divider} />

            {/* X-Ray Check */}
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Chest X-Ray:</Text>
              <View style={styles.actionGroup}>
                <Text style={[styles.statusBadge, student.xray === 'Approved' ? styles.bgGreen : styles.bgOrange]}>
                  {student.xray}
                </Text>
                <TouchableOpacity onPress={() => handleUpdateStatus(student.name, "X-Ray")}>
                  <Ionicons name="create-outline" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Physical Exam Check */}
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Physical Exam:</Text>
              <View style={styles.actionGroup}>
                <Text style={[styles.statusBadge, student.physical === 'Approved' ? styles.bgGreen : styles.bgOrange]}>
                  {student.physical}
                </Text>
                <TouchableOpacity onPress={() => handleUpdateStatus(student.name, "Physical Exam")}>
                  <Ionicons name="create-outline" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FE' },
  filterSection: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  filterLabel: { fontSize: 14, fontWeight: 'bold', color: '#444', marginBottom: 10 },
  pickerWrapper: { backgroundColor: '#F8F9FB', borderRadius: 10, borderWidth: 1, borderColor: '#DDD', overflow: 'hidden' },
  picker: { height: 50, width: '100%' },
  scrollContent: { padding: 15 },
  card: { backgroundColor: '#fff', borderRadius: 15, padding: 15, marginBottom: 15, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  studentName: { fontSize: 17, fontWeight: 'bold', color: '#1A1A1A' },
  studentId: { fontSize: 12, color: '#777', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 12 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  statusLabel: { fontSize: 14, color: '#444' },
  actionGroup: { flexDirection: 'row', alignItems: 'center' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, fontSize: 12, fontWeight: 'bold', color: '#fff', marginRight: 10 },
  bgGreen: { backgroundColor: '#2E7D32' },
  bgOrange: { backgroundColor: '#ED6C02' },
});