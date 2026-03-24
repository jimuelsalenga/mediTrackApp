import { Ionicons } from '@expo/vector-icons'; // Built-in with Expo
import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function StudentDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Header Section */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoPlaceholder}>
             {/* Replace with your Image component if you have the logo asset */}
             <Ionicons name="medical" size={24} color="#0066FF" />
          </View>
          <Text style={styles.headerTitle}>MediTrack</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} color="#0066FF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 2. Status Title & Year */}
        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>Your Status</Text>
          <Text style={styles.yearText}>2026</Text>
        </View>

        {/* 3. Compliance Blue Card */}
        <View style={styles.statusCard}>
          <Text style={styles.complianceLabel}>Compliance Level</Text>
          <Text style={styles.statusMainText}>No Records</Text>
          {/* Decorative Circle in the card */}
          <View style={styles.cardDecoration} />
        </View>

        {/* 4. Submissions Section */}
        <Text style={styles.subHeader}>My Submissions</Text>
        <View style={styles.emptySubmissionsBox}>
          <Text style={styles.emptyText}>
            No submissions yet. Upload a record to get started.
          </Text>
        </View>

        {/* 5. Action Button */}
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={() => router.push('/records')} // Navigates to the records/upload tab
        >
          <Ionicons name="add" size={24} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.submitButtonText}>Submit New Record</Text>
        </TouchableOpacity>

        {/* 6. Assistance/Help Section */}
        <TouchableOpacity style={styles.assistanceCard}>
          <View style={styles.assistanceLeft}>
            <View style={styles.iconCircle}>
              <Ionicons name="headset-outline" size={20} color="#666" />
            </View>
            <View>
              <Text style={styles.assistanceTitle}>Need assistance?</Text>
              <Text style={styles.assistanceSub}>Connect with Health Services Portal</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  scrollContent: {
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  yearText: {
    fontSize: 16,
    color: '#BBB',
    fontWeight: '600',
  },
  // Blue Status Card
  statusCard: {
    backgroundColor: '#1E90FF',
    borderRadius: 20,
    padding: 25,
    height: 140,
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 30,
    elevation: 5,
    shadowColor: '#1E90FF',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  complianceLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  statusMainText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  cardDecoration: {
    position: 'absolute',
    right: -20,
    bottom: -20,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  // Submissions section
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  emptySubmissionsBox: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
    marginBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    lineHeight: 22,
    fontSize: 15,
  },
  // Main Action Button
  submitButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    elevation: 3,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Assistance Card
  assistanceCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  assistanceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  assistanceTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  assistanceSub: {
    fontSize: 12,
    color: '#888',
  },
});