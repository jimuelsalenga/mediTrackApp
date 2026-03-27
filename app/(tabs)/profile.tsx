import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const userData = {
    name: "Jimuel Y. Salenga",
    email: "student@neu.edu.ph",
    studentId: "23-12345-678",
    program: "BS in Information Technology",
    yearLevel: "3rd Year",
  };

  const handleLogout = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Centered Header - No Buttons */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Student Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
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
          <View style={styles.itemDivider} />
          <DetailItem icon="card-outline" label="Student ID" value={userData.studentId} />
          <View style={styles.itemDivider} />
          <DetailItem icon="business-outline" label="University" value="New Era University" />
        </View>

        {/* 4. Settings/Actions */}
        <Text style={styles.sectionLabel}>Account Settings</Text>
        <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
          <View style={styles.actionLeft}>
            <View style={styles.actionIconBg}>
              <Ionicons name="notifications-outline" size={20} color="#3366FF" />
            </View>
            <Text style={styles.actionText}>Notification Preferences</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#CCC" />
        </TouchableOpacity>

        {/* 5. Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>MediTrack</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  container: { 
    flex: 1, 
    backgroundColor: '#F2F6FF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  header: {
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center', // Centers children vertically
    alignItems: 'center', // Centers children horizontally
    borderBottomWidth: 1,
    borderBottomColor: '#E1E4E8',
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#1A1A1A',
  },
  scrollContent: { padding: 20 },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    marginBottom: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
    marginTop: 10,
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#3366FF',
  },
  avatarLogo: { width: 50, height: 50 },
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
  sectionLabel: { fontSize: 12, fontWeight: 'bold', color: '#999', textTransform: 'uppercase', marginLeft: 10, marginBottom: 10, marginTop: 10, letterSpacing: 1 },
  infoBox: { backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 15, marginBottom: 20 },
  detailRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
  itemDivider: { height: 1, backgroundColor: '#F0F4F8', marginLeft: 55 },
  detailIconBg: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F0F4FF', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  detailLabel: { fontSize: 11, color: '#999', textTransform: 'uppercase', fontWeight: '600' },
  detailValue: { fontSize: 15, fontWeight: '600', color: '#333' },
  actionItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  actionLeft: { flexDirection: 'row', alignItems: 'center' },
  actionIconBg: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#F0F4FF', justifyContent: 'center', alignItems: 'center' },
  actionText: { marginLeft: 12, fontSize: 15, fontWeight: '600', color: '#333' },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#FFF1F0',
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#FFE0E0',
  },
  logoutText: { marginLeft: 10, color: '#FF3B30', fontSize: 16, fontWeight: 'bold' },
  versionText: { textAlign: 'center', color: '#BBB', fontSize: 12, marginTop: 30, marginBottom: 20 },
});