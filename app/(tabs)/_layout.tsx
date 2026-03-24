import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#3366FF' }}>
      
      {/* 1. STUDENT LOGIN - Header and Tabs removed */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false, // This removes the "Home" text at the top
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
          tabBarStyle: { display: 'none' }, 
        }}
      />

      {/* 2. ADMIN LOGIN - Header and Tabs removed */}
      <Tabs.Screen
        name="admin-login"
        options={{
          headerShown: false, // This removes the header for admin login
          tabBarStyle: { display: 'none' },
          href: null, 
        }}
      />

      {/* 3. ADMIN DASHBOARD - Header kept for professional branding */}
      <Tabs.Screen
        name="admin-dashboard"
        options={{
          headerTitle: 'Admin Portal',
          headerShown: true, // Keep this so the admin knows where they are
          tabBarStyle: { display: 'none' },
          href: null,
        }}
      />

      {/* 4. STUDENT RECORDS - Navigation visible */}
      <Tabs.Screen
        name="records"
        options={{
          title: 'Records',
          headerShown: true,
          tabBarIcon: ({ color }) => <Ionicons name="document-text" size={24} color={color} />,
          tabBarStyle: { display: 'flex' },
        }}
      />

      {/* 5. STUDENT DASHBOARD - Navigation visible */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          headerShown: true,
          tabBarIcon: ({ color }) => <Ionicons name="grid" size={24} color={color} />,
          tabBarStyle: { display: 'flex' },
        }}
      />
    </Tabs>
  );
}