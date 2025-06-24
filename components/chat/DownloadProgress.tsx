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
  <View className="m-4 rounded-2xl border border-gray-100 bg-white p-6">
    <Text className="mb-2 text-lg font-medium text-gray-800">
      Downloading model
    </Text>
    <Text className="mb-4 font-mono text-sm text-gray-600">{selectedGGUF}</Text>
    <Progress value={progress} className="w-full" />
  </View>
)

export default DownloadProgress
