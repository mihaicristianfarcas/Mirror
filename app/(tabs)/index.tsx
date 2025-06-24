import TabTitle from '@/components/TabTitle'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import '@/global.css'
import { ArrowRight } from '@/lib/icons/ArrowRight'
import { Grid3x3 } from '@/lib/icons/Grid3x3'
import { MessageCircle } from '@/lib/icons/MessageCircle'
import { Notebook } from '@/lib/icons/Notebook'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const App = () => {
  const quickActions = [
    {
      id: 'new-note',
      title: 'Create Note',
      subtitle: 'Capture a quick thought',
      icon: Notebook,
      color: '#3b82f6'
    },
    {
      id: 'new-mindmap',
      title: 'Explore Mind Maps',
      subtitle: 'Visualize your ideas',
      icon: Grid3x3,
      color: '#10b981'
    },
    {
      id: 'chat',
      title: 'Start Chat',
      subtitle: 'Ask questions or explore',
      icon: MessageCircle,
      color: '#f59e0b'
    }
  ]

  return (
    <SafeAreaView className="bg-background flex-1">
      <TabTitle
        title="Welcome to Mirror"
        subtitle="Your personal knowledge companion"
      />

      {/* Quick Actions */}
      <View className="px-6">
        <Text className="text-foreground-secondary mb-4 text-lg font-semibold">
          Quick Actions
        </Text>

        {quickActions.map(action => {
          const IconComponent = action.icon
          return (
            <Button
              key={action.id}
              variant="outline"
              className="bg-background border-border active:bg-background-secondary mb-3 h-auto flex-row items-center rounded-xl border p-5">
              <View
                style={{ backgroundColor: `${action.color}15` }}
                className="mr-4 h-12 w-12 items-center justify-center rounded-xl">
                <IconComponent size={24} color={action.color} strokeWidth={2} />
              </View>

              <View className="flex-1">
                <Text className="text-foreground text-base font-semibold">
                  {action.title}
                </Text>
                <Text className="text-muted-foreground mt-1 text-sm">
                  {action.subtitle}
                </Text>
              </View>

              <ArrowRight size={20} color="#cbd5e1" />
            </Button>
          )
        })}
      </View>

      {/* Recent Activity */}
      <View className="mt-8 px-6">
        <Text className="text-foreground-secondary mb-4 text-lg font-semibold">
          Recent Activity
        </Text>

        <View className="bg-background-secondary border-border-subtle rounded-xl border p-6">
          <Text className="text-muted-foreground text-center text-base">
            Your recent notes and mind maps will appear here
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default App
