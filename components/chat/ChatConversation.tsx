import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useColorScheme } from '@/lib/useColorScheme'
import { cn } from '@/lib/utils'
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
}) => {
  const { isDarkColorScheme } = useColorScheme()

  // Helper function to get text colors based on message role and theme
  // Alternative to using Tailwind classes for text colors, since they are not supported in Markdown component
  const getTextColor = (role: 'user' | 'assistant' | 'system') => {
    if (role === 'user') {
      return isDarkColorScheme
        ? 'hsl(240 5.9% 10%)' // dark mode: primary-foreground (dark text on light bg)
        : 'hsl(0 0% 98%)' // light mode: primary-foreground (light text on dark bg)
    } else {
      // For both 'assistant' and 'system' roles
      return isDarkColorScheme
        ? 'hsl(0 0% 98%)' // dark mode: card-foreground (light text)
        : 'hsl(240 10% 3.9%)' // light mode: card-foreground (dark text)
    }
  }

  // Helper function to get background colors for code blocks
  const getCodeBackgroundColor = () => {
    return isDarkColorScheme
      ? 'hsl(240 3.7% 15.9%)' // dark mode: muted
      : 'hsl(240 4.8% 95.9%)' // light mode: muted
  }

  // Helper function to get link colors
  const getLinkColor = () => {
    return isDarkColorScheme
      ? 'hsl(0 0% 98%)' // dark mode: primary
      : 'hsl(240 5.9% 10%)' // light mode: primary
  }

  return (
    <View className="px-4 py-3">
      <View className="mb-4">
        {conversation.slice(1).map((msg, index) => (
          <View key={index} className="mb-6">
            <View
              className={cn(
                'min-w-16 max-w-[85%] rounded-2xl px-4 py-3',
                msg.role === 'user'
                  ? 'self-end bg-primary'
                  : 'self-start border border-border bg-card'
              )}>
              {msg.thought && (
                <Button
                  variant="ghost"
                  onPress={() => toggleThought(index + 1)}
                  className="mb-0 min-h-0 p-1">
                  <View className="w-full">
                    <Text
                      className={cn(
                        'text-left text-xs font-medium',
                        msg.role === 'user'
                          ? 'text-primary-foreground'
                          : 'text-muted-foreground'
                      )}>
                      {msg.showThought
                        ? '▼ Hide reasoning'
                        : '▶ Show reasoning'}
                    </Text>
                  </View>
                </Button>
              )}
              {msg.showThought && msg.thought && (
                <View className="mb-3 rounded-lg border-l-2 border-border bg-muted p-3">
                  <Text className="mb-2 text-xs font-medium text-muted-foreground">
                    Reasoning:
                  </Text>
                  <Text className="text-xs leading-relaxed text-muted-foreground">
                    {msg.thought}
                  </Text>
                </View>
              )}
              <Markdown
                style={{
                  body: {
                    color: getTextColor(msg.role),
                    fontSize: 16,
                    lineHeight: 24,
                    margin: 0,
                    padding: 0
                  },
                  // Style for different markdown elements to ensure consistent theming
                  heading1: {
                    color: getTextColor(msg.role),
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginBottom: 8,
                    marginTop: 0
                  },
                  heading2: {
                    color: getTextColor(msg.role),
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginBottom: 6,
                    marginTop: 0
                  },
                  heading3: {
                    color: getTextColor(msg.role),
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginBottom: 4,
                    marginTop: 0
                  },
                  paragraph: {
                    color: getTextColor(msg.role),
                    fontSize: 16,
                    lineHeight: 24,
                    marginBottom: 8,
                    marginTop: 0
                  },
                  list_item: {
                    color: getTextColor(msg.role),
                    fontSize: 16,
                    lineHeight: 24
                  },
                  code_inline: {
                    color: getTextColor(msg.role),
                    backgroundColor: getCodeBackgroundColor(),
                    paddingHorizontal: 4,
                    paddingVertical: 2,
                    borderRadius: 4,
                    fontSize: 14
                  },
                  fence: {
                    color: getTextColor(msg.role),
                    backgroundColor: getCodeBackgroundColor(),
                    padding: 12,
                    borderRadius: 8,
                    fontSize: 14,
                    fontFamily: 'SpaceMono-Regular' // monospace font
                  },
                  link: {
                    color: getLinkColor(),
                    textDecorationLine: 'underline'
                  },
                  strong: {
                    color: getTextColor(msg.role),
                    fontWeight: 'bold'
                  },
                  em: {
                    color: getTextColor(msg.role),
                    fontStyle: 'italic'
                  }
                }}>
                {msg.content}
              </Markdown>
            </View>
            {msg.role === 'assistant' && (
              <Text className="mt-1 text-xs text-muted-foreground">
                {tokensPerSecond[Math.floor(index / 2)]} tokens/s
              </Text>
            )}
          </View>
        ))}
      </View>
    </View>
  )
}

export default ChatConversation
