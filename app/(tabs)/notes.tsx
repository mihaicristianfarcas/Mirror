import FloatingActionButton from '@/components/FloatingActionButton'
import TabTitle from '@/components/TabTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { Search } from '@/lib/icons/Search'
import { NoteService } from '@/lib/services/NoteService'
import { Note } from '@/lib/types/note'
import { router, useFocusEffect } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([])

  useFocusEffect(
    useCallback(() => {
      NoteService.getNotes().then(setNotes)
    }, [])
  )

  const handleCreateNote = () => {
    NoteService.createNote({ title: 'New Note', content: '' }).then(newNote => {
      router.push(`/notes/${newNote.id}`)
    })
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <TabTitle title="Notes" subtitle="Capture and organize your thoughts" />

      {/* Search Bar */}
      <View className="bg-background-secondary mx-6 mb-4 flex-row items-center rounded-xl border border-border px-4 py-3">
        <Search size={20} color="#94a3b8" />
        <Input
          placeholder="Search notes..."
          placeholderTextColor="#94a3b8"
          className="ml-3 flex-1 border-0 bg-transparent text-base text-foreground"
        />
      </View>

      {/* Notes List */}
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <Button
            variant="outline"
            className="active:bg-background-secondary mx-6 mb-4 h-auto rounded-xl border border-border bg-background p-5"
            onPress={() => router.push(`/notes/${item.id}`)}>
            <View className="mb-2 flex-row items-start justify-between">
              <Text className="flex-1 text-lg font-semibold text-foreground">
                {item.title}
              </Text>
              <Text className="text-foreground-subtle ml-3 text-sm">
                {new Date(item.updatedAt).toLocaleDateString()}
              </Text>
            </View>
            <Text
              className="text-base leading-relaxed text-muted-foreground"
              numberOfLines={2}>
              {item.content.replace(/<[^>]*>?/gm, '')}
            </Text>
          </Button>
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-16">
            <Text className="mb-4 text-lg text-muted-foreground">
              No notes yet
            </Text>
            <Text className="text-foreground-subtle px-8 text-center text-base">
              Start capturing your thoughts and ideas by creating your first
              note
            </Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      <FloatingActionButton onPress={handleCreateNote} />
    </SafeAreaView>
  )
}
