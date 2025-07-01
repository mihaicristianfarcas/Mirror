import TabTitle from '@/components/TabTitle'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { Bell } from '@/lib/icons/Bell'
import { ChevronRight } from '@/lib/icons/ChevronRight'
import { HelpCircle } from '@/lib/icons/HelpCircle'
import { Palette } from '@/lib/icons/Palette'
import { Shield } from '@/lib/icons/Shield'
import { useRouter } from 'expo-router'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface SettingsItem {
  id: string
  title: string
  description: string
  route: string
  icon: any
  color: string
}

const settingsItems: SettingsItem[] = [
  {
    id: 'ai',
    title: 'AI Settings',
    description: 'Configure AI models and preferences',
    route: '/settings/ai',
    icon: Palette,
    color: '#3b82f6'
  },
  {
    id: 'privacy',
    title: 'Privacy & Security',
    description: 'Manage your data and privacy settings',
    route: '/settings/privacy',
    icon: Shield,
    color: '#10b981'
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Control alerts and notifications',
    route: '/settings/notifications',
    icon: Bell,
    color: '#f59e0b'
  },
  {
    id: 'help',
    title: 'Help & Support',
    description: 'Get help and contact support',
    route: '/settings/help',
    icon: HelpCircle,
    color: '#8b5cf6'
  }
]

const Settings = () => {
  const router = useRouter()

  const handleSettingsPress = (route: string) => {
    router.push(route as any)
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <TabTitle title="Settings" subtitle="Customize your experience" />

      <View className="px-6">
        {settingsItems.map(item => {
          const IconComponent = item.icon
          return (
            <Button
              key={item.id}
              variant="outline"
              className="active:bg-background-secondary mb-3 h-auto flex-row items-center rounded-xl border border-border bg-background p-5"
              onPress={() => handleSettingsPress(item.route)}>
              <View
                style={{ backgroundColor: `${item.color}15` }}
                className="mr-4 h-12 w-12 items-center justify-center rounded-xl">
                <IconComponent size={24} color={item.color} strokeWidth={2} />
              </View>

              <View className="flex-1">
                <Text className="text-base font-semibold text-foreground">
                  {item.title}
                </Text>
                <Text className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </Text>
              </View>

              <ChevronRight size={20} color="#cbd5e1" />
            </Button>
          )
        })}
      </View>

      {/* App Version */}
      <View className="mt-8 px-6">
        <View className="bg-background-secondary border-border-subtle rounded-xl border p-4">
          <Text className="text-center text-sm text-muted-foreground">
            Mirror v1.0.0
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Settings
