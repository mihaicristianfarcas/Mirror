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
  <View className="border-t border-slate-200 bg-white p-4">
    <View className="flex-row gap-3">
      <TextInput
        className="min-h-[50px] flex-1 rounded-xl border border-slate-200 bg-white p-4 text-base text-slate-800"
        placeholder="Type your message..."
        placeholderTextColor="#94A3B8"
        value={userInput}
        onChangeText={setUserInput}
      />
      {isGenerating ? (
        <TouchableOpacity
          className="justify-center rounded-xl bg-red-500 px-6 py-3"
          onPress={stopGeneration}>
          <Text className="font-semibold text-white">□ Stop</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="justify-center rounded-xl bg-blue-500 px-6 py-3"
          onPress={handleSendMessage}
          disabled={isLoading}>
          <Text className="font-semibold text-white">
            {isLoading ? 'Sending...' : 'Send'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
)

export default ChatInput
