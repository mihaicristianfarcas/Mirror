import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import React from 'react'
import { View } from 'react-native'
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
            className={`max-w-[85%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-primary self-end' : 'border-border bg-card self-start border'}`}>
            <Text
              className={`text-base leading-relaxed ${msg.role === 'user' ? 'text-primary-foreground' : 'text-card-foreground'}`}>
              {msg.thought && (
                <Button
                  variant="ghost"
                  onPress={() => toggleThought(index + 1)}
                  className="mb-2 h-auto p-0">
                  <Text className="text-muted-foreground text-xs font-medium">
                    {msg.showThought ? '▼ Hide reasoning' : '▶ Show reasoning'}
                  </Text>
                </Button>
              )}
              {msg.showThought && msg.thought && (
                <View className="border-border bg-muted mb-3 rounded-lg border-l-2 p-3">
                  <Text className="text-muted-foreground mb-2 text-xs font-medium">
                    Reasoning:
                  </Text>
                  <Text className="text-muted-foreground text-xs leading-relaxed">
                    {msg.thought}
                  </Text>
                </View>
              )}
              <Markdown>{msg.content}</Markdown>
            </Text>
          </View>
          {msg.role === 'assistant' && (
            <Text className="text-muted-foreground mt-1 text-xs">
              {tokensPerSecond[Math.floor(index / 2)]} tokens/s
            </Text>
          )}
        </View>
      ))}
    </View>
  </View>
)

export default ChatConversation
