import { Home } from '@/lib/icons/Home'
import { Map } from '@/lib/icons/Map'
import { MessageCircle } from '@/lib/icons/MessageCircle'
import { Notebook } from '@/lib/icons/Notebook'
import { Settings2 } from '@/lib/icons/Settings2'
import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Home
              color={color}
              size={focused ? 26 : 24}
              strokeWidth={focused ? 2.2 : 1.8}
            />
          )
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notes',
          tabBarIcon: ({ color, focused }) => (
            <Notebook
              color={color}
              size={focused ? 26 : 24}
              strokeWidth={focused ? 2.2 : 1.8}
            />
          )
        }}
      />
      <Tabs.Screen
        name="mind-maps"
        options={{
          title: 'Mind Maps',
          tabBarIcon: ({ color, focused }) => (
            <Map
              color={color}
              size={focused ? 26 : 24}
              strokeWidth={focused ? 2.2 : 1.8}
            />
          )
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, focused }) => (
            <MessageCircle
              color={color}
              size={focused ? 26 : 24}
              strokeWidth={focused ? 2.2 : 1.8}
            />
          )
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Settings2
              color={color}
              size={focused ? 26 : 24}
              strokeWidth={focused ? 2.2 : 1.8}
            />
          )
        }}
      />
    </Tabs>
  )
}
