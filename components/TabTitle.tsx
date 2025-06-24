import React from 'react'
import { Text } from 'react-native'

interface TabTitleProps {
  title: string
  subtitle?: string
}

export default function TabTitle({
  title,
  subtitle
}: TabTitleProps): React.JSX.Element {
  return (
    <>
      <Text className="text-foreground mx-4 my-6 text-2xl font-bold">
        {title}
      </Text>
      {subtitle && (
        <Text className="text-muted-foreground mx-4 -mt-4 mb-4 text-base">
          {subtitle}
        </Text>
      )}
    </>
  )
}
