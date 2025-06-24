import TabTitle from '@/components/TabTitle'
import { Grid3x3 } from '@/lib/icons/Grid3x3'
import { Plus } from '@/lib/icons/Plus'
import { Search } from '@/lib/icons/Search'
import { FlatList, Pressable, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const MindMapsScreen = () => {
  const mockMindMaps = [
    {
      id: '1',
      title: 'Project Planning',
      nodeCount: 24,
      lastModified: 'Today',
      color: '#3b82f6'
    },
    {
      id: '2',
      title: 'Learning Path',
      nodeCount: 18,
      lastModified: 'Yesterday',
      color: '#10b981'
    },
    {
      id: '3',
      title: 'Creative Ideas',
      nodeCount: 12,
      lastModified: '3 days ago',
      color: '#f59e0b'
    }
  ]

  return (
    <SafeAreaView className="bg-background flex-1">
      <TabTitle
        title="Mind Maps"
        subtitle="Visualize your ideas and connections"
      />

      {/* Search Bar */}
      <View className="mx-6 mb-6">
        <View className="bg-background-secondary border-border-subtle flex-row items-center rounded-xl border px-4 py-3">
          <Search size={20} color="#94a3b8" />
          <TextInput
            placeholder="Search mind maps..."
            placeholderTextColor="#94a3b8"
            className="text-foreground ml-3 flex-1 text-base"
          />
        </View>
      </View>

      {/* Mind Maps Grid */}
      <FlatList
        data={mockMindMaps}
        renderItem={({ item }) => (
          <Pressable className="bg-background border-border active:bg-background-secondary mx-6 mb-4 overflow-hidden rounded-xl border">
            {/* Color accent bar */}
            <View
              style={{ backgroundColor: item.color }}
              className="h-1 w-full"
            />

            <View className="p-5">
              <View className="mb-3 flex-row items-start justify-between">
                <Text className="text-foreground flex-1 text-lg font-semibold">
                  {item.title}
                </Text>
                <Grid3x3 size={20} color="#94a3b8" />
              </View>

              <View className="flex-row items-center justify-between">
                <Text className="text-foreground-muted text-base">
                  {item.nodeCount} nodes
                </Text>
                <Text className="text-foreground-subtle text-sm">
                  {item.lastModified}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-16">
            <Grid3x3 size={48} color="#cbd5e1" />
            <Text className="text-foreground-muted mb-4 mt-4 text-lg">
              No mind maps yet
            </Text>
            <Text className="text-foreground-subtle px-8 text-center text-base">
              Create your first mind map to start visualizing your ideas and
              their connections
            </Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      <Pressable className="bg-accent active:bg-accent/90 absolute bottom-24 right-6 h-14 w-14 items-center justify-center rounded-full shadow-lg">
        <Plus size={24} color="white" strokeWidth={2.5} />
      </Pressable>
    </SafeAreaView>
  )
}

export default MindMapsScreen
