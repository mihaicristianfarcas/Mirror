import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native'

const SettingsScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <Text className="text-2xl font-bold text-foreground">Settings</Text>
    </SafeAreaView>
  )
}

export default SettingsScreen
