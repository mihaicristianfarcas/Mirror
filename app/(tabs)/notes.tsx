import TabTitle from '@/components/TabTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { Search } from '@/lib/icons/Search'
import { FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const NotesScreen = () => {
  const mockNotes = [
    {
      id: '1',
      title: 'Meeting Notes',
      preview: 'Discussed project timeline and deliverables...',
      date: 'Today'
    },
    {
      id: '2',
      title: 'Book Ideas',
      preview: 'Collection of interesting concepts for future reading...',
      date: 'Yesterday'
    },
    {
      id: '3',
      title: 'Recipe Collection',
      preview: 'Favorite recipes and cooking experiments...',
      date: '2 days ago'
    }
  ]

  return (
    <SafeAreaView className="bg-background flex-1">
      <TabTitle title="Notes" subtitle="Capture and organize your thoughts" />

      {/* Search Bar */}
      <View className="mx-6 mb-6">
        <View className="bg-background-secondary border-border-subtle flex-row items-center rounded-xl border px-4 py-3">
          <Search size={20} color="#94a3b8" />
          <Input
            placeholder="Search notes..."
            placeholderTextColor="#94a3b8"
            className="text-foreground ml-3 flex-1 border-0 bg-transparent text-base"
          />
        </View>
      </View>

      {/* Notes List */}
      <FlatList
        data={mockNotes}
        renderItem={({ item }) => (
          <Button
            variant="outline"
            className="bg-background border-border active:bg-background-secondary mx-6 mb-4 h-auto rounded-xl border p-5">
            <View className="mb-2 flex-row items-start justify-between">
              <Text className="text-foreground flex-1 text-lg font-semibold">
                {item.title}
              </Text>
              <Text className="text-foreground-subtle ml-3 text-sm">
                {item.date}
              </Text>
            </View>
            <Text
              className="text-foreground-muted text-base leading-relaxed"
              numberOfLines={2}>
              {item.preview}
            </Text>
          </Button>
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-16">
            <Text className="text-foreground-muted mb-4 text-lg">
              No notes yet
            </Text>
            <Text className="text-foreground-subtle px-8 text-center text-base">
              Start capturing your thoughts and ideas by creating your first
              note
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  )
}

export default NotesScreen
