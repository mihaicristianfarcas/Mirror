import React, { useEffect, useRef, useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View
} from 'react-native'

import { initLlama, releaseAllLlama } from 'llama.rn'

import ChatConversation from '@/components/chat/ChatConversation'
import ChatInput from '@/components/chat/ChatInput'
import TabTitle from '@/components/TabTitle'
import { Text } from '@/components/ui/text'
import '@/global.css'
import { useModel } from '@/lib/ModelContext'

type Message = {
  role: 'user' | 'assistant' | 'system'
  content: string
  thought?: string // Single thought block
  showThought?: boolean
}

export default function Chat(): React.JSX.Element {
  const { selectedModel, isModelLoaded, modelPath } = useModel()

  const INITIAL_CONVERSATION: Message[] = [
    {
      role: 'system',
      content:
        'This is a conversation between user and assistant, a friendly chatbot.'
    }
  ]
  const [context, setContext] = useState<any>(null)
  const [conversation, setConversation] =
    useState<Message[]>(INITIAL_CONVERSATION)
  const [userInput, setUserInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [tokensPerSecond, setTokensPerSecond] = useState<number[]>([])
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true)

  // To handle the scroll view
  const scrollViewRef = useRef<ScrollView>(null)
  const scrollPositionRef = useRef(0)
  const contentHeightRef = useRef(0)

  useEffect(() => {
    // If modelPath changes, load the model
    if (modelPath) {
      loadModel(modelPath)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelPath])

  const loadModel = async (modelFilePath: string) => {
    try {
      if (context) {
        await releaseAllLlama()
        setContext(null)
        setConversation(INITIAL_CONVERSATION)
      }
      const llamaContext = await initLlama({
        model: modelFilePath,
        use_mlock: true,
        n_ctx: 2048,
        n_gpu_layers: 1
      })
      setContext(llamaContext)
      // Optionally notify model loaded
      return true
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      Alert.alert('Error Loading Model', errorMessage)
      return false
    }
  }

  const toggleThought = (messageIndex: number) => {
    setConversation(prev =>
      prev.map((msg, index) =>
        index === messageIndex ? { ...msg, showThought: !msg.showThought } : msg
      )
    )
  }
  const handleScroll = (event: any) => {
    const currentPosition = event.nativeEvent.contentOffset.y
    const contentHeight = event.nativeEvent.contentSize.height
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height

    // Store current scroll position and content height
    scrollPositionRef.current = currentPosition
    contentHeightRef.current = contentHeight

    // If user has scrolled up more than 100px from bottom, disable auto-scroll
    const distanceFromBottom =
      contentHeight - scrollViewHeight - currentPosition
    setAutoScrollEnabled(distanceFromBottom < 100)
  }

  const handleSendMessage = async () => {
    if (!context) {
      Alert.alert('Model Not Loaded', 'Please load the model in Settings.')
      return
    }
    if (!userInput.trim()) {
      Alert.alert('Input Error', 'Please enter a message.')
      return
    }

    const newConversation: Message[] = [
      ...conversation,
      { role: 'user', content: userInput }
    ]
    setConversation(newConversation)
    setUserInput('')
    setIsLoading(true)
    setIsGenerating(true)
    setAutoScrollEnabled(true)

    try {
      const stopWords = [
        '</s>',
        '<|end|>',
        'user:',
        'assistant:',
        '<|im_end|>',
        '<|eot_id|>',
        '<|end▁of▁sentence|>',
        '<|end_of_text|>',
        '<｜end▁of▁sentence｜>'
      ]
      const chat = newConversation

      // Append a placeholder for the assistant's response
      setConversation(prev => [
        ...prev,
        {
          role: 'assistant',
          content: '',
          thought: undefined,
          showThought: false
        }
      ])
      let currentAssistantMessage = ''
      let currentThought = ''
      let inThinkBlock = false
      interface CompletionData {
        token: string
      }

      interface CompletionResult {
        timings: {
          predicted_per_second: number
        }
      }

      const result: CompletionResult = await context.completion(
        {
          messages: chat,
          n_predict: 10000,
          stop: stopWords
        },
        (data: CompletionData) => {
          const token = data.token // Extract the token
          currentAssistantMessage += token // Append token to the current message

          if (token.includes('<think>')) {
            inThinkBlock = true
            currentThought = token.replace('<think>', '')
          } else if (token.includes('</think>')) {
            inThinkBlock = false
            const finalThought = currentThought.replace('</think>', '').trim()

            setConversation(prev => {
              const lastIndex = prev.length - 1
              const updated = [...prev]

              updated[lastIndex] = {
                ...updated[lastIndex],
                content: updated[lastIndex].content.replace(
                  `<think>${finalThought}</think>`,
                  ''
                ),
                thought: finalThought
              }

              return updated
            })

            currentThought = ''
          } else if (inThinkBlock) {
            currentThought += token
          }

          const visibleContent = currentAssistantMessage
            .replace(/<think>.*?<\/think>/gs, '')
            .trim()

          setConversation(prev => {
            const lastIndex = prev.length - 1
            const updated = [...prev]
            updated[lastIndex].content = visibleContent
            return updated
          })

          if (autoScrollEnabled && scrollViewRef.current) {
            requestAnimationFrame(() => {
              scrollViewRef.current?.scrollToEnd({ animated: false })
            })
          }
        }
      )

      setTokensPerSecond(prev => [
        ...prev,
        parseFloat(result.timings.predicted_per_second.toFixed(2))
      ])
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      Alert.alert('Error During Inference', errorMessage)
    } finally {
      setIsLoading(false)
      setIsGenerating(false)
    }
  }

  return (
    <SafeAreaView className="bg-background flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          className="pb-5"
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          <TabTitle title="Chat about your writings" />
          {!isModelLoaded && (
            <Text className="text-muted-foreground px-4 text-center text-base">
              Please select and load a model in Settings.
            </Text>
          )}
          {isModelLoaded && (
            <ChatConversation
              conversation={conversation}
              tokensPerSecond={tokensPerSecond}
              toggleThought={toggleThought}
              selectedGGUF={selectedModel}
            />
          )}
        </ScrollView>
        <View className="border-border bg-card border-t pb-5">
          {isModelLoaded && (
            <ChatInput
              userInput={userInput}
              setUserInput={setUserInput}
              isGenerating={isGenerating}
              isLoading={isLoading}
              handleSendMessage={handleSendMessage}
              stopGeneration={() => {}}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
