import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logo} />
        <Text style={styles.title}>MediTrack</Text>
        <View style={styles.icon} />
      </View>

      {/* Status Card */}
      <View style={styles.statusCard}>
        <Text style={styles.statusText}>Document Status</Text>
        <Text style={styles.statusValue}>Approved ✅</Text>
      </View>

      {/* Upload Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Upload New Document</Text>
        <TouchableOpacity style={styles.uploadBtn}>
          <Text style={styles.uploadText}>Upload X-Ray</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Notifications</Text>
        <Text style={styles.notification}>✔ Your X-Ray has been approved</Text>
        <Text style={styles.notification}>⏳ New upload under review</Text>
      </View>

      {/* Profile Shortcut */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Profile</Text>
        <Text>Name: Student User</Text>
        <Text>ID: 2025-0001</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFD',
    padding: 16
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  logo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007BFF'
  },

  title: {
    fontSize: 18,
    fontWeight: '600'
  },

  icon: {
    width: 24,
    height: 24,
    backgroundColor: '#ccc',
    borderRadius: 12
  },

  statusCard: {
    backgroundColor: '#007BFF',
    padding: 20,
    borderRadius: 24,
    marginTop: 20
  },

  statusText: {
    color: '#fff',
    fontSize: 14
  },

  statusValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5
  },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 24,
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3
  },

  cardTitle: {
    fontWeight: '600',
    marginBottom: 10
  },

  uploadBtn: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center'
  },

  uploadText: {
    color: '#fff'
  },

  notification: {
    marginTop: 5
  }
});