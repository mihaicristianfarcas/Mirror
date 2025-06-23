import { Search } from 'lucide-react-native'
import { Text, FlatList, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const NotesScreen = () => {
  return (
    <SafeAreaView>
      <Text style={{ padding: 20, fontSize: 24, fontWeight: 'bold' }}>
        Your Notes
      </Text>

      <View className="flex-row items-center justify-start gap-4 rounded-lg bg-white p-4 shadow-sm">
        <Search />
        <TextInput
          placeholder="Search notes..."
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5
          }}
        />
      </View>
      <FlatList
        data={[{ key: 'Note 1' }, { key: 'Note 2' }, { key: 'Note 3' }]}
        renderItem={({ item }) => (
          <Text style={{ padding: 20, fontSize: 18 }}>{item.key}</Text>
        )}
        keyExtractor={item => item.key}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

export default NotesScreen
