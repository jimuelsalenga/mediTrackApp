import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NotificationsScreen() {
  // Demo Notification Data
  const notifications = [
    {
      id: '1',
      title: 'X-Ray Result Approved',
      message: 'Your Chest X-Ray has been verified by the University Health Office.',
      time: '2 hours ago',
      type: 'success',
      icon: 'checkmark-circle'
    },
    {
      id: '2',
      title: 'Physical Exam Pending',
      message: 'Your Physical Examination record is currently being reviewed.',
      time: '1 day ago',
      type: 'warning',
      icon: 'time'
    },
    {
      id: '3',
      title: 'Welcome to MediTrack',
      message: 'Complete your medical requirements to clear your enrollment status.',
      time: '2 days ago',
      type: 'info',
      icon: 'information-circle'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Unified Header with Notch Support */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image 
            source={require('../../assets/images/neu-logo.png')} 
            style={styles.logoSmall} 
            resizeMode="contain" 
          />
          <View>
            <Text style={styles.headerTitle}>Notifications</Text>
            <Text style={styles.headerSubtitle}>NEU Health Portal</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.profileButton} 
            onPress={() => router.push('/profile')}
          >
            <Ionicons name="person-circle-outline" size={32} color="#3366FF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {notifications.map((item) => (
          <TouchableOpacity key={item.id} style={styles.notificationCard} activeOpacity={0.7}>
            <View style={[
              styles.iconBox, 
              item.type === 'success' ? styles.bgGreen : 
              item.type === 'warning' ? styles.bgOrange : 
              styles.bgBlue
            ]}>
              <Ionicons name={item.icon as any} size={24} color="#fff" />
            </View>
            <View style={styles.textContainer}>
              <View style={styles.titleRow}>
                <Text style={styles.notiTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.notiTime}>{item.time}</Text>
              </View>
              <Text style={styles.notiMessage} numberOfLines={2}>{item.message}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F2F6FF', // Standardized background
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E4E8',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  logoSmall: { width: 38, height: 38, marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  headerSubtitle: { fontSize: 10, color: '#3366FF', fontWeight: 'bold', textTransform: 'uppercase' },
  profileButton: { padding: 5 },
  scrollContent: { padding: 20 },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 18, // Slightly more rounded for modern look
    marginBottom: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  bgGreen: { backgroundColor: '#4CAF50' },
  bgOrange: { backgroundColor: '#FF9800' },
  bgBlue: { backgroundColor: '#3366FF' },
  textContainer: { flex: 1 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4, alignItems: 'center' },
  notiTitle: { fontSize: 15, fontWeight: 'bold', color: '#1A1A1A', flex: 1, marginRight: 5 },
  notiTime: { fontSize: 11, color: '#999' },
  notiMessage: { fontSize: 13, color: '#666', lineHeight: 18 },
});