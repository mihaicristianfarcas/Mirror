import TabTitle from '@/components/TabTitle'
import { Settings2 } from '@/lib/icons/Settings2'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface SettingsItem {
  id: string
  title: string
  description: string
  route: string
  icon?: React.ReactNode
}

const settingsItems: SettingsItem[] = [
  {
    id: 'ai',
    title: 'AI Settings',
    description: 'Configure AI models and preferences',
    route: '/settings/ai'
  }
]

const Settings = () => {
  const router = useRouter()

  const handleSettingsPress = (route: string) => {
    router.push(route as any)
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <TabTitle title="Settings" subtitle="Customize your experience" />

      <View className="flex-1 pt-5">
        {settingsItems.map(item => (
          <TouchableOpacity
            key={item.id}
            className="mx-4 mb-3 flex-row items-center rounded-xl bg-white px-5 py-4 shadow-sm"
            onPress={() => handleSettingsPress(item.route)}
            activeOpacity={0.7}>
            <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              {item.icon || <Settings2 size={24} color="#666" />}
            </View>
            <View className="flex-1">
              <Text className="mb-0.5 text-base font-semibold text-gray-900">
                {item.title}
              </Text>
              <Text className="text-sm leading-4 text-gray-600">
                {item.description}
              </Text>
            </View>
            <View className="ml-3">
              <Text className="text-xl font-light text-gray-300">›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  )
}

export default Settings
