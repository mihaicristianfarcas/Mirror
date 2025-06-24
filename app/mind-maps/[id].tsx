import { Text } from '@/components/ui/text'
import { SafeAreaView } from 'react-native-safe-area-context'

const MindMapScreen = () => {
  return (
    <SafeAreaView className="bg-background flex-1">
      <Text className="text-foreground text-2xl font-bold">Mind Map</Text>
    </SafeAreaView>
  )
}

export default MindMapScreen
