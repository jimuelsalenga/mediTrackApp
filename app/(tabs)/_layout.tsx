import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#0066FF', 
      headerShown: false 
    }}>
      {/* LOGIN SCREEN CONFIG */}
      <Tabs.Screen
        name="index"
        options={{
          // This hides the entire footer bar on this screen
          tabBarStyle: { display: 'none' }, 
          // This ensures the login doesn't have its own button
          href: null, 
        }}
      />

      {/* OTHER SCREENS */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="records"
        options={{
          title: 'Records',
          tabBarIcon: ({ color }) => <Ionicons name="document-text-outline" size={24} color={color} />,
        }}
      />

      {/* Hide admin and other utility screens from the footer */}
      <Tabs.Screen name="admin-login" options={{ href: null }} />
      <Tabs.Screen name="admin-dashboard" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ href: null }} />
      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>
  );
}