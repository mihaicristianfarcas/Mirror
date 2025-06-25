import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import React from 'react'
import { ActivityIndicator, Alert, View } from 'react-native'

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
  deleteModel?: (file: string) => Promise<boolean>
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
  deleteModel,
  setCurrentPage,
  setSelectedGGUF
}) => {
  const handleDeleteModel = (file: string) => {
    if (!deleteModel) return

    Alert.alert(
      'Delete Model',
      `Are you sure you want to delete ${file}? This action cannot be undone.`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteModel(file)
        }
      ]
    )
  }

  return (
    <View className="m-4 rounded-2xl border border-border bg-card p-6">
      <Text className="mb-4 text-lg font-medium text-card-foreground">
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
          <Text className="mb-3 mt-6 text-lg font-medium text-card-foreground">
            Available models
          </Text>
          {isFetching && (
            <ActivityIndicator size="small" color="hsl(var(--foreground))" />
          )}
          {availableGGUFs.map((file, index) => {
            const isDownloaded = downloadedModels.includes(file)
            return (
              <View key={index} className="my-1 overflow-hidden rounded-lg">
                <View
                  className={`rounded-lg p-4 ${selectedGGUF === file ? 'border border-primary bg-primary' : isDownloaded ? 'border border-border bg-muted' : 'border border-border bg-card'} h-auto`}>
                  <View className="flex-row items-center justify-between">
                    <Button
                      variant="ghost"
                      className="h-auto flex-1 justify-start p-0"
                      onPress={() =>
                        isDownloaded
                          ? (loadModel(file),
                            setCurrentPage('conversation'),
                            setSelectedGGUF(file))
                          : handleGGUFSelection(file)
                      }>
                      <View className="flex-1 flex-row items-center">
                        {isDownloaded ? (
                          <View className="mr-3 h-2 w-2 rounded-full bg-green-500"></View>
                        ) : (
                          <View className="mr-3 h-2 w-2 rounded-full bg-muted-foreground"></View>
                        )}
                        <Text
                          className={`text-sm font-medium ${selectedGGUF === file ? 'text-primary-foreground' : 'text-card-foreground'}`}>
                          {file.split('-').pop()}
                        </Text>
                      </View>
                    </Button>
                    <View className="flex-row items-center gap-2">
                      {isDownloaded ? (
                        <View className="ml-3 rounded-md border border-green-200 bg-green-50 px-3 py-1">
                          <Text className="text-xs font-medium text-green-700">
                            Load
                          </Text>
                        </View>
                      ) : (
                        <View className="ml-3 rounded-md border border-border bg-muted px-3 py-1">
                          <Text className="text-xs font-medium text-muted-foreground">
                            Download
                          </Text>
                        </View>
                      )}
                      {isDownloaded && deleteModel && (
                        <Button
                          variant="ghost"
                          className="h-auto p-2"
                          onPress={() => handleDeleteModel(file)}>
                          <Text className="text-xs font-medium text-red-600">
                            Delete
                          </Text>
                        </Button>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            )
          })}
        </View>
      )}
    </View>
  )
}

export default ModelSelection
