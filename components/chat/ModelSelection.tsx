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
  <View className="m-4 rounded-2xl bg-white p-6 shadow-md">
    <Text className="mb-4 mt-4 text-lg font-semibold text-slate-800">
      Choose a model format
    </Text>
    {modelFormats.map(format => (
      <TouchableOpacity
        key={format.label}
        className={`my-1 rounded-xl bg-blue-200 px-6 py-3 shadow ${selectedModelFormat === format.label ? 'bg-blue-600' : ''}`}
        onPress={() => handleFormatSelection(format.label)}>
        <Text
          className={`text-center text-base font-semibold ${selectedModelFormat === format.label ? 'text-white' : 'text-blue-900'}`}>
          {format.label}
        </Text>
      </TouchableOpacity>
    ))}
    {selectedModelFormat && (
      <View>
        <Text className="mb-2 mt-4 text-lg font-semibold text-slate-800">
          Select a .gguf file
        </Text>
        {isFetching && <ActivityIndicator size="small" color="#2563EB" />}
        {availableGGUFs.map((file, index) => {
          const isDownloaded = downloadedModels.includes(file)
          return (
            <View key={index} className="my-1 overflow-hidden rounded-xl">
              <TouchableOpacity
                className={`rounded-xl border bg-blue-50 p-3 ${selectedGGUF === file ? 'bg-blue-600' : ''} ${isDownloaded ? 'border-blue-600' : 'border-blue-200'}`}
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
                      <View className="mr-2 rounded-md bg-blue-100 p-1">
                        <Text className="text-xs font-bold text-blue-600">
                          ▼
                        </Text>
                      </View>
                    ) : (
                      <View className="mr-2 rounded-md bg-slate-100 p-1">
                        <Text className="text-xs font-bold text-slate-400">
                          ▽
                        </Text>
                      </View>
                    )}
                    <Text
                      className={`text-sm font-medium ${selectedGGUF === file ? 'text-white' : isDownloaded ? 'text-blue-800' : 'text-blue-900'}`}>
                      {file.split('-').pop()}
                    </Text>
                  </View>
                  {isDownloaded ? (
                    <View className="ml-2 rounded-md bg-blue-100 px-3 py-1">
                      <Text className="text-xs font-semibold tracking-wide text-blue-600">
                        TAP TO LOAD →
                      </Text>
                    </View>
                  ) : (
                    <View className="ml-2 rounded-md bg-green-100 px-3 py-1">
                      <Text className="text-xs font-semibold tracking-wide text-green-600">
                        DOWNLOAD →
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
