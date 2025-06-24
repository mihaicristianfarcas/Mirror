import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'

interface ModelSelectionProps {
  modelFormats: { label: string }[]
  selectedModelFormat: string
  handleFormatSelection: (format: string) => void
  availableGGUFs: string[]
  isFetching: boolean
  downloadedModels: string[]
  selectedGGUF: string | null
  handleGGUFSelection: (file: string) => void
  loadModel: (file: string) => void
  setCurrentPage: (page: 'modelSelection' | 'conversation') => void
  setSelectedGGUF: (file: string | null) => void
}

const ModelSelection: React.FC<ModelSelectionProps> = ({
  modelFormats,
  selectedModelFormat,
  handleFormatSelection,
  availableGGUFs,
  isFetching,
  downloadedModels,
  selectedGGUF,
  handleGGUFSelection,
  loadModel,
  setCurrentPage,
  setSelectedGGUF
}) => (
  <View className="m-4 rounded-2xl border border-gray-100 bg-white p-6">
    <Text className="mb-4 text-lg font-medium text-gray-800">
      Select model format
    </Text>
    {modelFormats.map(format => (
      <TouchableOpacity
        key={format.label}
        className={`my-1 rounded-lg border px-4 py-3 ${selectedModelFormat === format.label ? 'border-gray-900 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}
        onPress={() => handleFormatSelection(format.label)}>
        <Text
          className={`text-center text-base font-medium ${selectedModelFormat === format.label ? 'text-white' : 'text-gray-700'}`}>
          {format.label}
        </Text>
      </TouchableOpacity>
    ))}
    {selectedModelFormat && (
      <View>
        <Text className="mb-3 mt-6 text-lg font-medium text-gray-800">
          Available models
        </Text>
        {isFetching && <ActivityIndicator size="small" color="#374151" />}
        {availableGGUFs.map((file, index) => {
          const isDownloaded = downloadedModels.includes(file)
          return (
            <View key={index} className="my-1 overflow-hidden rounded-lg">
              <TouchableOpacity
                className={`rounded-lg border p-4 ${selectedGGUF === file ? 'border-gray-900 bg-gray-900' : isDownloaded ? 'border-gray-300 bg-gray-50' : 'border-gray-200 bg-white'}`}
                onPress={() =>
                  isDownloaded
                    ? (loadModel(file),
                      setCurrentPage('conversation'),
                      setSelectedGGUF(file))
                    : handleGGUFSelection(file)
                }>
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 flex-row items-center">
                    {isDownloaded ? (
                      <View className="mr-3 h-2 w-2 rounded-full bg-green-500"></View>
                    ) : (
                      <View className="mr-3 h-2 w-2 rounded-full bg-gray-300"></View>
                    )}
                    <Text
                      className={`text-sm font-medium ${selectedGGUF === file ? 'text-white' : 'text-gray-700'}`}>
                      {file.split('-').pop()}
                    </Text>
                  </View>
                  {isDownloaded ? (
                    <View className="ml-3 rounded-md border border-green-200 bg-green-50 px-3 py-1">
                      <Text className="text-xs font-medium text-green-700">
                        Load
                      </Text>
                    </View>
                  ) : (
                    <View className="ml-3 rounded-md border border-gray-200 bg-gray-100 px-3 py-1">
                      <Text className="text-xs font-medium text-gray-600">
                        Download
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    )}
  </View>
)

export default ModelSelection
