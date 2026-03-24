import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function StudentDashboard() {
  // Simulated state - in a real app, this comes from your database
  const [notificationsCount, setNotificationsCount] = useState(1);
  const [examStatus, setExamStatus] = useState({
    xray: 'Pending',
    physical: 'Approved'
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Header with Notification Badge */}
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
            {notificationsCount > 0 && (
              <View style={styles.notifBadge}>
                <Text style={styles.notifText}>{notificationsCount}</Text>
              </View>
            )}
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
        
        {/* 2. Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.greetingText}>Hello, Student!</Text>
          <Text style={styles.subGreeting}>Stay updated with your medical requirements.</Text>
        </View>

        {/* 3. Real-time Verification Status */}
        <View style={styles.sectionHeader}>
          <Text style={styles.subHeader}>Verification Status</Text>
        </View>
        <View style={styles.statusListCard}>
          <StatusRow 
            icon="barcode-outline" 
            label="Chest X-Ray" 
            status={examStatus.xray} 
          />
          <View style={styles.divider} />
          <StatusRow 
            icon="fitness-outline" 
            label="Physical Exam" 
            status={examStatus.physical} 
          />
        </View>

        {/* 4. Main Compliance Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusInfo}>
            <Text style={styles.complianceLabel}>Current Compliance</Text>
            <Text style={styles.statusMainText}>Incomplete</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Action Required</Text>
            </View>
          </View>
          <Ionicons name="shield-checkmark" size={80} color="rgba(255,255,255,0.2)" style={styles.cardIcon} />
        </View>

        {/* 5. Submissions Button */}
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={() => router.push('/records')}
          activeOpacity={0.8}
        >
          <View style={styles.buttonIconBg}>
            <Ionicons name="cloud-upload" size={24} color="#3366FF" />
          </View>
          <Text style={styles.submitButtonText}>Update Medical Records</Text>
        </TouchableOpacity>

        {/* 6. Support Card */}
        <TouchableOpacity style={styles.assistanceCard}>
          <View style={styles.assistanceLeft}>
            <View style={styles.iconCircle}>
              <Ionicons name="help-buoy-outline" size={20} color="#3366FF" />
            </View>
            <View>
              <Text style={styles.assistanceTitle}>University Health Office</Text>
              <Text style={styles.assistanceSub}>Inquiries and Verification Support</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

// Sub-component for Status Rows
function StatusRow({ icon, label, status }: { icon: any, label: string, status: string }) {
  const isApproved = status === 'Approved';
  return (
    <View style={styles.statusRow}>
      <View style={styles.statusRowLeft}>
        <Ionicons name={icon} size={22} color="#555" />
        <Text style={styles.statusLabelText}>{label}</Text>
      </View>
      <View style={[styles.statusIndicator, { backgroundColor: isApproved ? '#E8F5E9' : '#FFF3E0' }]}>
        <Text style={[styles.statusIndicatorText, { color: isApproved ? '#2E7D32' : '#EF6C00' }]}>
          {status}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F6FF' },
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
  iconButton: { padding: 5, marginRight: 10, position: 'relative' },
  profileButton: { padding: 5 },
  notifBadge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#FF3B30',
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  notifText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  scrollContent: { padding: 20 },
  welcomeSection: { marginBottom: 25 },
  greetingText: { fontSize: 26, fontWeight: 'bold', color: '#1A1A1A' },
  subGreeting: { fontSize: 14, color: '#666', marginTop: 4 },
  sectionHeader: { marginBottom: 12 },
  subHeader: { fontSize: 16, fontWeight: 'bold', color: '#555', textTransform: 'uppercase', letterSpacing: 0.5 },
  statusListCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#E1E4E8',
  },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  statusRowLeft: { flexDirection: 'row', alignItems: 'center' },
  statusLabelText: { marginLeft: 12, fontSize: 15, fontWeight: '600', color: '#333' },
  statusIndicator: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  statusIndicatorText: { fontSize: 12, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 5 },
  statusCard: {
    backgroundColor: '#3366FF',
    borderRadius: 24,
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    ...Platform.select({
      ios: { shadowColor: '#3366FF', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 15 },
      android: { elevation: 10 },
    }),
  },
  statusInfo: { flex: 1 },
  complianceLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: '600' },
  statusMainText: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginVertical: 8 },
  badge: { backgroundColor: 'rgba(255,255,255,0.2)', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  cardIcon: { position: 'absolute', right: -10, bottom: -10 },
  submitButton: {
    backgroundColor: '#3366FF',
    flexDirection: 'row',
    height: 65,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    elevation: 5,
  },
  buttonIconBg: { backgroundColor: '#fff', borderRadius: 12, padding: 4, marginRight: 12 },
  submitButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  assistanceCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E1E4E8',
    marginBottom: 30,
  },
  assistanceLeft: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#F0F4FF', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  assistanceTitle: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  assistanceSub: { fontSize: 12, color: '#888', marginTop: 2 },
});