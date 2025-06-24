import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { View } from 'react-native'

interface ChatInputProps {
  userInput: string
  setUserInput: (text: string) => void
  isGenerating: boolean
  isLoading: boolean
  handleSendMessage: () => void
  stopGeneration: () => void
}

const ChatInput: React.FC<ChatInputProps> = ({
  userInput,
  setUserInput,
  isGenerating,
  isLoading,
  handleSendMessage,
  stopGeneration
}) => (
  <View className="px-4 pt-3">
    <View className="flex-row items-center justify-end gap-3">
      <Textarea
        className="border-border bg-background text-foreground focus:border-ring focus:bg-background min-h-10 flex-1 rounded-xl border px-4 py-3 text-base"
        placeholder="Message..."
        placeholderTextColor="hsl(var(--muted-foreground))"
        value={userInput}
        onChangeText={setUserInput}
        multiline
        numberOfLines={1}
      />
      {isGenerating ? (
        <Button
          variant="outline"
          className="bg-secondary justify-center rounded-xl px-5 py-3"
          onPress={stopGeneration}>
          <Text className="text-secondary-foreground font-medium">Stop</Text>
        </Button>
      ) : (
        <Button
          className="bg-primary justify-center rounded-xl px-5 py-3"
          onPress={handleSendMessage}
          disabled={isLoading}>
          <Text className="text-primary-foreground font-medium">
            {isLoading ? 'Sending...' : 'Send'}
          </Text>
        </Button>
      )}
    </View>
  </View>
)

export default ChatInput
