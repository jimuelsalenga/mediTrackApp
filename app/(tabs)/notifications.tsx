import { Ionicons } from '@expo/vector-icons';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
      {/* Header with NEU Logo */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image 
            source={require('../../assets/images/neu-logo.png')} 
            style={styles.neuLogoHeader} 
            resizeMode="contain" 
          />
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {notifications.map((item) => (
          <TouchableOpacity key={item.id} style={styles.notificationCard}>
            <View style={[styles.iconBox, item.type === 'success' ? styles.bgGreen : item.type === 'warning' ? styles.bgOrange : styles.bgBlue]}>
              <Ionicons name={item.icon as any} size={24} color="#fff" />
            </View>
            <View style={styles.textContainer}>
              <View style={styles.titleRow}>
                <Text style={styles.notiTitle}>{item.title}</Text>
                <Text style={styles.notiTime}>{item.time}</Text>
              </View>
              <Text style={styles.notiMessage}>{item.message}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  neuLogoHeader: { width: 30, height: 30, marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  scrollContent: { padding: 15 },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  bgGreen: { backgroundColor: '#2E7D32' },
  bgOrange: { backgroundColor: '#ED6C02' },
  bgBlue: { backgroundColor: '#3366FF' },
  textContainer: { flex: 1 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  notiTitle: { fontSize: 15, fontWeight: 'bold', color: '#1A1A1A' },
  notiTime: { fontSize: 11, color: '#AAA' },
  notiMessage: { fontSize: 13, color: '#666', lineHeight: 18 },
});