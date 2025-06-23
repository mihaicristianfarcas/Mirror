import { SafeAreaView } from 'react-native-safe-area-context'
import '@/global.css'
import { Text } from 'react-native'

const App = () => {
  return (
    <SafeAreaView className="bg-background flex-1">
      {/* The rest of your app components will go here */}
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text className="text-foreground text-2xl font-bold">
          Welcome to the App!
        </Text>
        <Text className="text-muted-foreground text-lg">
          This is a simple example of using SafeAreaView.
        </Text>
      </SafeAreaView>
    </SafeAreaView>
  )
}

export default App
