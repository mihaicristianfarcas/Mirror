import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'

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
  <View className="border-border bg-card m-4 rounded-2xl border p-6">
    <Text className="text-card-foreground mb-4 text-lg font-medium">
      Select model format
    </Text>
    {modelFormats.map(format => (
      <Button
        key={format.label}
        variant={selectedModelFormat === format.label ? 'default' : 'outline'}
        className={`my-1 rounded-lg px-4 py-3 ${selectedModelFormat === format.label ? 'border-primary bg-primary' : 'border-border bg-muted'}`}
        onPress={() => handleFormatSelection(format.label)}>
        <Text
          className={`text-center text-base font-medium ${selectedModelFormat === format.label ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
          {format.label}
        </Text>
      </Button>
    ))}
    {selectedModelFormat && (
      <View>
        <Text className="text-card-foreground mb-3 mt-6 text-lg font-medium">
          Available models
        </Text>
        {isFetching && (
          <ActivityIndicator size="small" color="hsl(var(--foreground))" />
        )}
        {availableGGUFs.map((file, index) => {
          const isDownloaded = downloadedModels.includes(file)
          return (
            <View key={index} className="my-1 overflow-hidden rounded-lg">
              <Button
                variant={selectedGGUF === file ? 'default' : 'outline'}
                className={`rounded-lg p-4 ${selectedGGUF === file ? 'border-primary bg-primary' : isDownloaded ? 'border-border bg-muted' : 'border-border bg-card'} h-auto`}
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
                      <View className="bg-muted-foreground mr-3 h-2 w-2 rounded-full"></View>
                    )}
                    <Text
                      className={`text-sm font-medium ${selectedGGUF === file ? 'text-primary-foreground' : 'text-card-foreground'}`}>
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
                    <View className="border-border bg-muted ml-3 rounded-md border px-3 py-1">
                      <Text className="text-muted-foreground text-xs font-medium">
                        Download
                      </Text>
                    </View>
                  )}
                </View>
              </Button>
            </View>
          )
        })}
      </View>
    )}
  </View>
)

export default ModelSelection
