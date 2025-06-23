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
  <View className="flex-1 p-4">
    <Text className="mb-4 text-xs font-semibold text-blue-300">
      Chatting with {selectedGGUF}
    </Text>
    <View className="mb-4 flex-1 rounded-2xl bg-slate-50 p-4">
      <Text className="my-3 text-center text-xs font-medium text-slate-400">
        🦙 Welcome! The Llama is ready to chat. Ask away! 🎉
      </Text>
      {conversation.slice(1).map((msg, index) => (
        <View key={index} className="mb-4">
          <View
            className={`max-w-[80%] rounded-xl p-3 ${msg.role === 'user' ? 'self-end bg-blue-500' : 'self-start border border-slate-200 bg-white'}`}>
            <Text
              className={`text-base ${msg.role === 'user' ? 'text-white' : 'text-slate-800'}`}>
              {msg.thought && (
                <TouchableOpacity
                  onPress={() => toggleThought(index + 1)}
                  className="mt-2 py-1">
                  <Text className="text-xs font-medium text-blue-500">
                    {msg.showThought ? '▼ Hide Thought' : '▶ Show Thought'}
                  </Text>
                </TouchableOpacity>
              )}
              {msg.showThought && msg.thought && (
                <View className="mt-2 rounded-md border-l-4 border-slate-400 bg-slate-100 p-2">
                  <Text className="mb-1 text-xs font-semibold text-slate-400">
                    Model&apos;s Reasoning:
                  </Text>
                  <Text className="text-xs italic leading-4 text-slate-600">
                    {msg.thought}
                  </Text>
                </View>
              )}
              <Markdown>{msg.content}</Markdown>
            </Text>
          </View>
          {msg.role === 'assistant' && (
            <Text className="mt-1 text-right text-xs text-slate-400">
              {tokensPerSecond[Math.floor(index / 2)]} tokens/s
            </Text>
          )}
        </View>
      ))}
    </View>
  </View>
)

export default ChatConversation
