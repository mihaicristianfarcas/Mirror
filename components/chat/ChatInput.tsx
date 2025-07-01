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
        className="min-h-10 flex-1 rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground focus:border-ring focus:bg-background"
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
          className="justify-center rounded-xl bg-secondary px-5 py-3"
          onPress={stopGeneration}>
          <Text className="font-medium text-secondary-foreground">Stop</Text>
        </Button>
      ) : (
        <Button
          className="justify-center rounded-xl bg-primary px-5 py-3"
          onPress={handleSendMessage}
          disabled={isLoading}>
          <Text className="font-medium text-primary-foreground">
            {isLoading ? 'Sending...' : 'Send'}
          </Text>
        </Button>
      )}
    </View>
  </View>
)

export default ChatInput
