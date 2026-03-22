import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AdminLogin() {
  const router = useRouter();

  const [staffId, setStaffId] = useState('');
  const [pin, setPin] = useState('');

  const handleLogin = () => {
    if (staffId === 'admin01' && pin === '1234') {
      router.push('/admin-dashboard');
    } else {
      alert('Invalid Admin Credentials');
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Admin Login</Text>

      {/* Inputs */}
      <TextInput
        placeholder="Staff ID Number"
        value={staffId}
        onChangeText={setStaffId}
        style={styles.input}
      />

      <TextInput
        placeholder="Secure PIN"
        secureTextEntry
        value={pin}
        onChangeText={setPin}
        style={styles.input}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login 🔒</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFD',
    justifyContent: 'center',
    padding: 20
  },

  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#1A237E'
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2
  },

  button: {
    backgroundColor: '#1A237E',
    padding: 16,
    borderRadius: 24,
    marginTop: 10
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600'
  }
});