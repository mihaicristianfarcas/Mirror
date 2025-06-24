import React from 'react'
import { Text, View } from 'react-native'

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
      <Text className="text-foreground text-3xl font-bold leading-tight tracking-tight">
        {title}
      </Text>
      {subtitle && (
        <Text className="text-foreground-muted mt-2 text-lg leading-relaxed">
          {subtitle}
        </Text>
      )}
    </View>
  )
}
