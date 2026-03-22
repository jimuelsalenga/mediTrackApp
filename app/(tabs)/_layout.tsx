import { Tabs } from 'expo-router';
import { Bell, FileText, Home, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#007BFF', // MediTrack Blue
      headerShown: false, 
      tabBarStyle: { height: 60, paddingBottom: 10 }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          // Added : { color: string } to fix the TypeScript error
          tabBarIcon: ({ color }: { color: string }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="records"
        options={{
          title: 'Records',
          tabBarIcon: ({ color }: { color: string }) => <FileText size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color }: { color: string }) => <Bell size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }: { color: string }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}