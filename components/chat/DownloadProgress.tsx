import ProgressBar from '@/components/ProgressBar'
import React from 'react'
import { Text, View } from 'react-native'

interface DownloadProgressProps {
  selectedGGUF: string | null
  progress: number
}

const DownloadProgress: React.FC<DownloadProgressProps> = ({
  selectedGGUF,
  progress
}) => (
  <View className="m-4 rounded-2xl bg-white p-6 shadow-md">
    <Text className="mb-2 text-lg font-semibold text-slate-800">
      Downloading :
    </Text>
    <Text className="mb-4 text-xs font-semibold text-blue-300">
      {selectedGGUF}
    </Text>
    <ProgressBar progress={progress} />
  </View>
)

export default DownloadProgress
