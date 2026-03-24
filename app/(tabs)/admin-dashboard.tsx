import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
    { id: '2023-001', name: 'Juan Dela Cruz', program: 'BS in Information Technology', xray: 'Pending', physical: 'Approved' },
    { id: '2023-002', name: 'Maria Santos', program: 'BS in Nursing', xray: 'Approved', physical: 'Approved' },
    { id: '2023-003', name: 'Mark Ramos', program: 'BS in Information Technology', xray: 'Pending', physical: 'Pending' },
  ]);

  const handleLogout = () => {
    router.replace('/');
  };

  const openActionModal = (student: any, type: string) => {
    setActiveStudent(student);
    setActiveType(type);
    setAdminComment('');
    setModalVisible(true);
  };

  const handleProcess = (status: 'Approved' | 'Denied') => {
    if (!activeStudent) return;

    // Logic to update the local state for demonstration
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
    
    // Tab Logic: History shows records where BOTH are processed. Pending shows if ANY are pending.
    const isProcessed = s.xray !== 'Pending' && s.physical !== 'Pending';
    const matchesTab = showHistory ? isProcessed : !isProcessed;

    return matchesFilter && matchesSearch && matchesTab;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={require('../../assets/images/neu-logo.png')} style={styles.logo} resizeMode="contain" />
          <View>
            <Text style={styles.headerTitle}>Admin Portal</Text>
            <Text style={styles.headerSub}>Health Office</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
        </TouchableOpacity>
      </View>

      {/* History Toggle */}
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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedFilter}
            onValueChange={(val) => setSelectedFilter(val)}
            style={styles.picker}
          >
            {programs.map((p) => (
              <Picker.Item key={p} label={p} value={p} />
            ))}
          </Picker>
        </View>

        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <View key={student.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.avatar}><Text style={styles.avatarText}>{student.name[0]}</Text></View>
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
                      <Text style={[styles.statusBadge, student[item.key as keyof typeof student] === 'Approved' ? styles.bgGreen : styles.bgOrange]}>
                        {student[item.key as keyof typeof student]}
                      </Text>
                      <Ionicons name="create-outline" size={16} color="#3366FF" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No records found for this section.</Text>
          </View>
        )}
      </ScrollView>

      {/* Review Modal - FIXED NULL CHECK */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          {activeStudent && (
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Review {activeType}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              
              <Text style={styles.modalSubName}>{activeStudent.name}</Text>
              
              <Text style={styles.inputLabel}>Quick Feedback</Text>
              <View style={styles.chipContainer}>
                {quickComments.map((comment) => (
                  <TouchableOpacity key={comment} style={styles.chip} onPress={() => setAdminComment(comment)}>
                    <Text style={styles.chipText}>{comment}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput 
                style={styles.textArea}
                placeholder="Write a custom comment..."
                multiline
                value={adminComment}
                onChangeText={setAdminComment}
              />

              <View style={styles.modalActions}>
                <TouchableOpacity style={[styles.actionBtn, styles.btnDeny]} onPress={() => handleProcess('Denied')}>
                  <Text style={styles.btnText}>Disapprove</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, styles.btnApprove]} onPress={() => handleProcess('Approved')}>
                  <Text style={styles.btnText}>Approve</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FE' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 35, height: 35, marginRight: 12 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  headerSub: { fontSize: 12, color: '#3366FF', fontWeight: '600' },
  logoutBtn: { padding: 8, backgroundColor: '#FFF5F5', borderRadius: 10 },
  tabBar: { flexDirection: 'row', backgroundColor: '#fff', padding: 5, margin: 15, borderRadius: 12, elevation: 1 },
  tabItem: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  activeTab: { backgroundColor: '#3366FF' },
  tabText: { fontWeight: '600', color: '#666' },
  activeTabText: { color: '#fff' },
  pickerContainer: { backgroundColor: '#fff', marginHorizontal: 15, marginBottom: 15, borderRadius: 12, borderWidth: 1, borderColor: '#DDD', overflow: 'hidden' },
  picker: { height: 50 },
  scrollContent: { paddingBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginHorizontal: 15, marginBottom: 15, elevation: 2 },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E1EFFF', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#3366FF', fontWeight: 'bold' },
  studentName: { fontSize: 16, fontWeight: 'bold' },
  studentId: { fontSize: 11, color: '#777' },
  divider: { height: 1, backgroundColor: '#F8F9FA', marginVertical: 15 },
  statusGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  statusColumn: { flex: 0.48 },
  miniLabel: { fontSize: 10, fontWeight: 'bold', color: '#BBB', marginBottom: 5 },
  statusAction: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F9FAFC', padding: 8, borderRadius: 10, borderWidth: 1, borderColor: '#F0F0F0' },
  statusBadge: { fontSize: 11, fontWeight: 'bold', color: '#fff', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  bgGreen: { backgroundColor: '#2E7D32' },
  bgOrange: { backgroundColor: '#ED6C02' },
  emptyState: { padding: 50, alignItems: 'center' },
  emptyText: { color: '#999', fontStyle: 'italic' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, paddingBottom: 40 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  modalSubName: { fontSize: 14, color: '#3366FF', marginBottom: 20, fontWeight: '500' },
  inputLabel: { fontSize: 12, fontWeight: 'bold', color: '#999', marginBottom: 10 },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 },
  chip: { backgroundColor: '#F0F5FF', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, marginRight: 8, marginBottom: 8 },
  chipText: { fontSize: 12, color: '#3366FF', fontWeight: '600' },
  textArea: { backgroundColor: '#F4F7FE', borderRadius: 15, padding: 15, textAlignVertical: 'top', height: 80, marginBottom: 20 },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between' },
  actionBtn: { flex: 0.48, height: 55, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  btnApprove: { backgroundColor: '#2E7D32' },
  btnDeny: { backgroundColor: '#D32F2F' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});