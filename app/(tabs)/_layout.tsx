import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        tabBarActiveTintColor: '#3366FF',
        headerShown: false
      }}
    >
      {/* 1. STUDENT LOGIN - Hidden from Bottom Bar */}
      <Tabs.Screen
        name="index"
        options={{
          href: null, 
          tabBarStyle: { display: 'none' },
        }}
      />

      {/* 2. ADMIN LOGIN & DASHBOARD - Hidden from Bottom Bar */}
      <Tabs.Screen
        name="admin-login"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="admin-dashboard"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />

      {/* 3. RECORDS - Now the first icon */}

      {/* 4. DASHBOARD - Second icon */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <Ionicons name="grid" size={24} color={color} />,
          tabBarStyle: { display: 'flex' },
        }}
      />

      <Tabs.Screen
        name="records"
        options={{
          title: 'Records',
          tabBarIcon: ({ color }) => <Ionicons name="document-text" size={24} color={color} />,
          tabBarStyle: { display: 'flex' },
        }}
      />

      {/* 5. PROFILE - Third icon */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
          tabBarStyle: { display: 'flex' },
        }}
      />
      
      {/* Utility screens */}
      <Tabs.Screen name="notifications" options={{ href: null }} />
    </Tabs>
  );
}