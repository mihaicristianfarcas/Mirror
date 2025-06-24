import TabTitle from '@/components/TabTitle'
import { SafeAreaView } from 'react-native-safe-area-context'

const MindMapsScreen = () => {
  return (
    <SafeAreaView className="bg-background flex-1">
      <TabTitle
        title="Mind Maps"
        subtitle="Visualize your ideas and connections"
      />
    </SafeAreaView>
  )
}

export default MindMapsScreen
