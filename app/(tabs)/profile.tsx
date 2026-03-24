import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  // These would eventually come from your Auth state/database
  const userData = {
    name: "student",
    email: "student@neu.edu.ph",
    studentId: "23-12345-678",
    program: "BS in Information Technology",
    yearLevel: "3rd Year",
  };

  const handleLogout = () => {
    // Navigate back to login and clear navigation history
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* 1. Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Student Profile</Text>
          <View style={{ width: 24 }} /> {/* Spacer for centering */}
        </View>

        {/* 2. Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image 
              source={require('../../assets/images/neu-logo.png')} 
              style={styles.avatarLogo} 
              resizeMode="contain" 
            />
          </View>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
          
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{userData.yearLevel}</Text>
          </View>
        </View>

        {/* 3. Academic Details Section */}
        <Text style={styles.sectionLabel}>Academic Information</Text>
        <View style={styles.infoBox}>
          <DetailItem icon="school-outline" label="Program" value={userData.program} />
          <DetailItem icon="card-outline" label="Student ID" value={userData.studentId} />
          <DetailItem icon="business-outline" label="University" value="New Era University" />
        </View>

        {/* 4. Settings/Actions */}
        <Text style={styles.sectionLabel}>Account Settings</Text>
        <TouchableOpacity style={styles.actionItem}>
          <View style={styles.actionLeft}>
            <Ionicons name="notifications-outline" size={22} color="#3366FF" />
            <Text style={styles.actionText}>Notification Preferences</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#CCC" />
        </TouchableOpacity>

        {/* 5. Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>MediTrack v1.0.2</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// Sub-component for clean rows
function DetailItem({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <View style={styles.detailRow}>
      <View style={styles.detailIconBg}>
        <Ionicons name={icon} size={20} color="#3366FF" />
      </View>
      <View>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F6FF' },
  scrollContent: { padding: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A' },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    marginBottom: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#3366FF',
  },
  avatarLogo: { width: 60, height: 60 },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A' },
  userEmail: { fontSize: 14, color: '#666', marginTop: 4 },
  badge: {
    backgroundColor: '#E8F0FF',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 15,
  },
  badgeText: { color: '#3366FF', fontWeight: 'bold', fontSize: 12 },
  sectionLabel: { fontSize: 13, fontWeight: 'bold', color: '#999', textTransform: 'uppercase', marginLeft: 10, marginBottom: 10, marginTop: 10 },
  infoBox: { backgroundColor: '#fff', borderRadius: 20, padding: 15, marginBottom: 20 },
  detailRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  detailIconBg: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F0F4FF', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  detailLabel: { fontSize: 12, color: '#999' },
  detailValue: { fontSize: 15, fontWeight: '600', color: '#333' },
  actionItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  actionLeft: { flexDirection: 'row', alignItems: 'center' },
  actionText: { marginLeft: 12, fontSize: 16, fontWeight: '500', color: '#333' },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#FFF1F0',
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  logoutText: { marginLeft: 10, color: '#FF3B30', fontSize: 16, fontWeight: 'bold' },
  versionText: { textAlign: 'center', color: '#BBB', fontSize: 12, marginTop: 30, marginBottom: 20 },
});