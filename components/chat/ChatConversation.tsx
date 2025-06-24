import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Markdown from 'react-native-markdown-display'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
  thought?: string
  showThought?: boolean
}

interface ChatConversationProps {
  conversation: Message[]
  tokensPerSecond: number[]
  toggleThought: (index: number) => void
  selectedGGUF: string | null
}

const ChatConversation: React.FC<ChatConversationProps> = ({
  conversation,
  tokensPerSecond,
  toggleThought,
  selectedGGUF
}) => (
  <View className="flex-1 px-4 py-3">
    <View className="mb-4 flex-1 p-1">
      {conversation.slice(1).map((msg, index) => (
        <View key={index} className="mb-6">
          <View
            className={`max-w-[85%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'self-end bg-gray-900' : 'self-start border border-gray-100 bg-gray-50'}`}>
            <Text
              className={`text-base leading-relaxed ${msg.role === 'user' ? 'text-white' : 'text-gray-800'}`}>
              {msg.thought && (
                <TouchableOpacity
                  onPress={() => toggleThought(index + 1)}
                  className="mb-2">
                  <Text className="text-xs font-medium text-gray-500">
                    {msg.showThought ? '▼ Hide reasoning' : '▶ Show reasoning'}
                  </Text>
                </TouchableOpacity>
              )}
              {msg.showThought && msg.thought && (
                <View className="mb-3 rounded-lg border-l-2 border-gray-300 bg-gray-50 p-3">
                  <Text className="mb-2 text-xs font-medium text-gray-500">
                    Reasoning:
                  </Text>
                  <Text className="text-xs leading-relaxed text-gray-600">
                    {msg.thought}
                  </Text>
                </View>
              )}
              <Markdown>{msg.content}</Markdown>
            </Text>
          </View>
          {msg.role === 'assistant' && (
            <Text className="mt-1 text-xs text-gray-400">
              {tokensPerSecond[Math.floor(index / 2)]} tokens/s
            </Text>
          )}
        </View>
      ))}
    </View>
  </View>
)

export default ChatConversation
