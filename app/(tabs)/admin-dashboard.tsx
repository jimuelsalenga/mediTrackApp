import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Modal, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AdminDashboard() {
  const [selectedFilter, setSelectedFilter] = useState('All Programs');
  const [searchQuery, setSearchQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [activeStudent, setActiveStudent] = useState<any>(null);
  const [activeType, setActiveType] = useState('');
  const [adminComment, setAdminComment] = useState('');

  const programs = ["All Programs", "BS in Information Technology", "BS in Computer Science", "BS in Nursing"];
  const quickComments = ["Image is blurry", "Incorrect File", "Expired Document", "Details Mismatch"];

  const [studentRecords, setStudentRecords] = useState([
    { id: '23-12345-678', name: 'Juan Dela Cruz', program: 'BS in Information Technology', xray: 'Pending', physical: 'Approved' },
    { id: '24-12346-486', name: 'Maria Santos', program: 'BS in Nursing', xray: 'Approved', physical: 'Approved' },
    { id: '23-12345-675', name: 'Mark Ramos', program: 'BS in Information Technology', xray: 'Pending', physical: 'Pending' },
  ]);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to exit the Admin Portal?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: () => router.replace('/') }
    ]);
  };

  const openActionModal = (student: any, type: string) => {
    setActiveStudent(student);
    setActiveType(type);
    setAdminComment('');
    setModalVisible(true);
  };

  const handleProcess = (status: 'Approved' | 'Denied') => {
    if (!activeStudent) return;

    const updatedRecords = studentRecords.map(s => {
      if (s.id === activeStudent.id) {
        return {
          ...s,
          [activeType === 'Chest X-Ray' ? 'xray' : 'physical']: status
        };
      }
      return s;
    });

    setStudentRecords(updatedRecords);
    setModalVisible(false);
    Alert.alert("Success", `${activeType} for ${activeStudent.name} has been ${status}.`);
  };

  const filteredStudents = studentRecords.filter(s => {
    const matchesFilter = selectedFilter === 'All Programs' || s.program === selectedFilter;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const isProcessed = s.xray !== 'Pending' && s.physical !== 'Pending';
    const matchesTab = showHistory ? isProcessed : !isProcessed;

    return matchesFilter && matchesSearch && matchesTab;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Improved Unified Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={require('../../assets/images/neu-logo.png')} style={styles.logo} resizeMode="contain" />
          <View>
            <Text style={styles.headerTitle}>Admin Portal</Text>
            <Text style={styles.headerSub}>HEALTH OFFICE</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
        </TouchableOpacity>
      </View>

      {/* 2. History Toggle */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tabItem, !showHistory && styles.activeTab]} 
          onPress={() => setShowHistory(false)}
        >
          <Text style={[styles.tabText, !showHistory && styles.activeTabText]}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabItem, showHistory && styles.activeTab]} 
          onPress={() => setShowHistory(true)}
        >
          <Text style={[styles.tabText, showHistory && styles.activeTabText]}>History</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Search & Filter Container */}
        <View style={styles.filterSection}>
           <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedFilter}
              onValueChange={(val) => setSelectedFilter(val)}
              style={styles.picker}
            >
              {programs.map((p) => (
                <Picker.Item key={p} label={p} value={p} style={{fontSize: 14}} />
              ))}
            </Picker>
          </View>
        </View>

        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <View key={student.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{student.name[0]}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.studentName}>{student.name}</Text>
                  <Text style={styles.studentId}>{student.id} • {student.program}</Text>
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.statusGrid}>
                {[ {label: 'Chest X-Ray', key: 'xray'}, {label: 'Physical Exam', key: 'physical'} ].map((item) => (
                  <View key={item.key} style={styles.statusColumn}>
                    <Text style={styles.miniLabel}>{item.label.toUpperCase()}</Text>
                    <TouchableOpacity onPress={() => openActionModal(student, item.label)} style={styles.statusAction}>
                      <Text style={[styles.statusBadge, student[item.key as keyof typeof student] === 'Approved' ? styles.colorGreen : styles.colorOrange]}>
                        {student[item.key as keyof typeof student]}
                      </Text>
                      <Ionicons name="chevron-forward" size={14} color="#3366FF" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="folder-open-outline" size={50} color="#CCC" />
            <Text style={styles.emptyText}>No records found.</Text>
          </View>
        )}
      </ScrollView>

      {/* Review Modal code remains the same as your previous logic */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        {/* ... (Your Modal Content) */}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F4F7FE',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingVertical: 12, 
    backgroundColor: '#fff', 
    borderBottomWidth: 1, 
    borderBottomColor: '#EEE',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 38, height: 38, marginRight: 12 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  headerSub: { fontSize: 10, color: '#3366FF', fontWeight: 'bold', letterSpacing: 1 },
  logoutBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    backgroundColor: '#FFF5F5', 
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE0E0'
  },
  logoutText: { color: '#FF3B30', fontSize: 12, fontWeight: 'bold', marginLeft: 4 },
  tabBar: { flexDirection: 'row', backgroundColor: '#fff', padding: 5, margin: 15, borderRadius: 15, elevation: 1 },
  tabItem: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12 },
  activeTab: { backgroundColor: '#3366FF' },
  tabText: { fontWeight: 'bold', color: '#888', fontSize: 14 },
  activeTabText: { color: '#fff' },
  filterSection: { paddingHorizontal: 15 },
  pickerContainer: { backgroundColor: '#fff', marginBottom: 15, borderRadius: 15, borderWidth: 1, borderColor: '#E1E4E8', overflow: 'hidden' },
  picker: { height: 50 },
  scrollContent: { paddingBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 16, marginHorizontal: 15, marginBottom: 15, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#F0F5FF', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#3366FF', fontWeight: 'bold', fontSize: 18 },
  studentName: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A' },
  studentId: { fontSize: 12, color: '#777', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#F0F4F8', marginVertical: 15 },
  statusGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  statusColumn: { flex: 0.48 },
  miniLabel: { fontSize: 9, fontWeight: 'bold', color: '#999', marginBottom: 6, letterSpacing: 0.5 },
  statusAction: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F9FAFC', padding: 10, borderRadius: 12, borderWidth: 1, borderColor: '#F0F0F0' },
  statusBadge: { fontSize: 12, fontWeight: 'bold' },
  colorGreen: { color: '#2E7D32' },
  colorOrange: { color: '#ED6C02' },
  emptyState: { padding: 80, alignItems: 'center' },
  emptyText: { color: '#999', marginTop: 10, fontWeight: '500' },
});