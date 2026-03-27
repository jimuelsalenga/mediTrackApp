import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        tabBarActiveTintColor: '#3366FF',
        tabBarInactiveTintColor: '#8E8E93',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#F0F0F0',
          height: 60, // Fixed height
          paddingBottom: 8,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabIconContainer}>
              {focused && <View style={styles.activeIndicator} />}
              <Ionicons name={focused ? "grid" : "grid-outline"} size={22} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="records"
        options={{
          title: 'Records',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabIconContainer}>
              {focused && <View style={styles.activeIndicator} />}
              <Ionicons name={focused ? "document-text" : "document-text-outline"} size={22} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabIconContainer}>
              {focused && <View style={styles.activeIndicator} />}
              <Ionicons name={focused ? "person" : "person-outline"} size={22} color={color} />
            </View>
          ),
        }}
      />
      {/* Hidden Screens */}
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="admin-login" options={{ href: null }} />
      <Tabs.Screen name="admin-dashboard" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  activeIndicator: {
    width: 40, // Smaller line to look cleaner
    height: 3,
    backgroundColor: '#3366FF',
    position: 'absolute',
    top: -10, // Pulls the line down closer to the icon
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  }
});