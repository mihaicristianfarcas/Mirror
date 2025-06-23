import { Home } from '@/lib/icons/Home'
import { Map } from '@/lib/icons/Map'
import { MessageCircle } from '@/lib/icons/MessageCircle'
import { Notebook } from '@/lib/icons/Notebook'
import { Settings2 } from '@/lib/icons/Settings2'
import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Home
              color={color}
              size={focused ? 26 : 24}
              strokeWidth={focused ? 2.5 : 2}
            />
          )
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notes',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Notebook
              color={color}
              size={focused ? 26 : 24}
              strokeWidth={focused ? 2.5 : 2}
            />
          )
        }}
      />
      <Tabs.Screen
        name="mind-maps"
        options={{
          title: 'Mind Maps',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Map
              color={color}
              size={focused ? 26 : 24}
              strokeWidth={focused ? 2.5 : 2}
            />
          )
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <MessageCircle
              color={color}
              size={focused ? 26 : 24}
              strokeWidth={focused ? 2.5 : 2}
            />
          )
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Settings2
              color={color}
              size={focused ? 26 : 24}
              strokeWidth={focused ? 2.5 : 2}
            />
          )
        }}
      />
    </Tabs>
  )
}
