import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

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
  <View className="border-t border-gray-100 bg-white px-4 py-3">
    <View className="flex-row items-center justify-end gap-3">
      <TextInput
        className="min-h-10 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-800 focus:border-gray-300 focus:bg-white"
        placeholder="Message..."
        placeholderTextColor="#9CA3AF"
        value={userInput}
        onChangeText={setUserInput}
        multiline
      />
      {isGenerating ? (
        <TouchableOpacity
          className="justify-center rounded-xl bg-gray-700 px-5 py-3"
          onPress={stopGeneration}>
          <Text className="font-medium text-white">Stop</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="justify-center rounded-xl bg-gray-900 px-5 py-3"
          onPress={handleSendMessage}
          disabled={isLoading}>
          <Text className="font-medium text-white">
            {isLoading ? 'Sending...' : 'Send'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
)

export default ChatInput
