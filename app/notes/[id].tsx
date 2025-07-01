import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { ArrowLeft } from '@/lib/icons/ArrowLeft'
import { NoteService } from '@/lib/services/NoteService'
import { Note } from '@/lib/types/note'
import { useColorScheme } from '@/lib/useColorScheme'
import { router, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  UIManager,
  View
} from 'react-native'
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill'
import { SafeAreaView } from 'react-native-safe-area-context'

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default function NoteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { isDarkColorScheme } = useColorScheme()
  const _editor = React.createRef<QuillEditor>()
  const [note, setNote] = useState<Note | null>(null)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [showToolbar, setShowToolbar] = useState(false)

  useEffect(() => {
    NoteService.getNote(id).then(note => {
      if (note) {
        setNote(note)
      } else {
        router.back()
      }
    })
  }, [id])

  const handleGoBack = () => {
    router.back()
  }

  const handleDelete = () => {
    if (id) {
      NoteService.deleteNote(id).then(() => {
        router.back()
      })
    }
  }

  const handleSelectionChange = (data: any) => {
    const { range } = data
    if (range) {
      LayoutAnimation.easeInEaseOut()
      setShowToolbar(true)
    } else {
      LayoutAnimation.easeInEaseOut()
      setShowToolbar(false)
    }
  }

  const updateNote = useCallback(
    (updatedNote: Partial<Note>) => {
      if (id) {
        NoteService.updateNote(id, updatedNote)
      }
    },
    [id]
  )

  if (!note) {
    return null
  }

  return (
    <SafeAreaView
      className="flex-1 bg-background"
      onTouchStart={() => _editor.current?.blur()}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        {/* Header */}
        <View className="mx-6 flex-row items-center justify-between bg-card/50 py-4">
          <TouchableOpacity
            onPress={handleGoBack}
            className="flex-row items-center rounded-lg active:bg-accent">
            <ArrowLeft size={16} className="mr-2 text-muted-foreground" />
            <Text className="text-md text-muted-foreground">Back to notes</Text>
          </TouchableOpacity>
        </View>

        {/* Note Title */}
        <View className="mx-6 my-2 bg-card/30">
          {isEditingTitle ? (
            <Input
              value={note.title}
              onChangeText={title => setNote({ ...note, title })}
              onBlur={() => {
                setIsEditingTitle(false)
                updateNote({ title: note.title })
              }}
              onSubmitEditing={() => {
                setIsEditingTitle(false)
                updateNote({ title: note.title })
              }}
              autoFocus
              placeholder="Enter note title..."
              placeholderTextColor={isDarkColorScheme ? '#64748b' : '#94a3b8'}
              className="min-h-10 py-2 text-2xl font-bold leading-8 text-foreground"
              multiline={false}
              maxLength={100}
            />
          ) : (
            <TouchableOpacity
              onPress={() => setIsEditingTitle(true)}
              className="min-h-10justify-center py-2">
              <Text className="text-2xl font-bold leading-8 text-foreground">
                {note.title}
              </Text>
            </TouchableOpacity>
          )}
          <View className="mt-1 flex-row items-center justify-between gap-4">
            <Text className="text-sm text-muted-foreground">
              {new Date(note.updatedAt).toLocaleString()}
            </Text>
            <View className="mt-1 flex-row items-center justify-end gap-8">
              <TouchableOpacity onPress={handleDelete}>
                <Text className="text-sm text-muted-foreground">Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text className="text-sm text-muted-foreground">More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Editor Container */}
        <View className="mx-1 flex-1 bg-background">
          <QuillEditor
            key={isDarkColorScheme ? 'dark' : 'light'}
            ref={_editor}
            initialHtml={note.content}
            onHtmlChange={({ html }) => updateNote({ content: html })}
            onSelectionChange={handleSelectionChange}
            theme={
              isDarkColorScheme
                ? {
                    background: '#09090b',
                    color: '#ffffff',
                    placeholder: '#71717a'
                  }
                : {
                    background: '#ffffff',
                    color: '#09090b',
                    placeholder: '#a1a1aa'
                  }
            }
            quill={{
              placeholder: 'Start writing your note...',
              modules: {
                toolbar: false
              }
            }}
          />
        </View>

        {/* Toolbar */}
        {showToolbar && (
          <View className="w-full">
            <QuillToolbar
              editor={_editor as React.RefObject<QuillEditor>}
              options="full"
              theme={isDarkColorScheme ? 'dark' : 'light'}
              styles={{
                toolbar: {
                  provider: provided => ({
                    ...provided,
                    backgroundColor: 'transparent',
                    borderColor: 'transparent'
                  }),
                  root: provided => ({
                    ...provided,
                    borderColor: 'transparent'
                  })
                }
              }}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
