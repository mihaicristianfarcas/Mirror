import { Text } from '@/components/ui/text'
import React from 'react'
import { View } from 'react-native'

interface TabTitleProps {
  title: string
  subtitle?: string
}

export default function TabTitle({
  title,
  subtitle
}: TabTitleProps): React.JSX.Element {
  return (
    <View className="px-6 pb-6 pt-4">
      <Text className="text-3xl font-bold leading-tight tracking-tight text-foreground">
        {title}
      </Text>
      {subtitle && (
        <Text className="mt-2 text-lg leading-relaxed text-muted-foreground">
          {subtitle}
        </Text>
      )}
    </View>
  )
}
