import { Text } from '@/components/ui/text'
import { SafeAreaView } from 'react-native-safe-area-context'

const MindMapScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <Text className="text-2xl font-bold text-foreground">Mind Map</Text>
    </SafeAreaView>
  )
}

export default MindMapScreen
