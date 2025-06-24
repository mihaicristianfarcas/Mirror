import { Progress } from '@/components/ui/progress'
import { Text } from '@/components/ui/text'
import React from 'react'
import { View } from 'react-native'

interface DownloadProgressProps {
  selectedGGUF: string | null
  progress: number
}

const DownloadProgress: React.FC<DownloadProgressProps> = ({
  selectedGGUF,
  progress
}) => (
  <View className="border-border bg-card m-4 rounded-2xl border p-6">
    <Text className="text-card-foreground mb-2 text-lg font-medium">
      Downloading model
    </Text>
    <Text className="text-muted-foreground mb-4 font-mono text-sm">
      {selectedGGUF}
    </Text>
    <Progress value={progress} className="w-full" />
  </View>
)

export default DownloadProgress
