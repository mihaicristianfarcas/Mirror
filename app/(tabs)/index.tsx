import TabTitle from '@/components/TabTitle'
import '@/global.css'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const App = () => {
  return (
    <SafeAreaView className="bg-background flex-1">
      <TabTitle
        title="Welcome to Mirror"
        subtitle="Your personal knowledge companion"
      />
      {/* The rest of your app components will go here */}
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text className="text-muted-foreground text-lg">
          This is a simple example of using SafeAreaView.
        </Text>
      </SafeAreaView>
    </SafeAreaView>
  )
}

export default App
