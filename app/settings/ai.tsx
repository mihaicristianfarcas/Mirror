import { downloadModel } from '@/api/model'
import ModelSelection from '@/components/chat/ModelSelection'
import { ArrowLeft } from '@/lib/icons/ArrowLeft'
import { useModel } from '@/lib/ModelContext'
import axios from 'axios'
import { router } from 'expo-router'
import { releaseAllLlama } from 'llama.rn'
import React, { useState } from 'react'
import { Alert, Text, TouchableOpacity } from 'react-native'
import RNFS from 'react-native-fs'
import { SafeAreaView } from 'react-native-safe-area-context'

const modelFormats = [
  { label: 'Llama-3.2-1B-Instruct' },
  { label: 'Qwen2-0.5B-Instruct' },
  { label: 'DeepSeek-R1-Distill-Qwen-1.5B' },
  { label: 'SmolLM2-1.7B-Instruct' }
]

const HF_TO_GGUF = {
  'Llama-3.2-1B-Instruct': 'medmekk/Llama-3.2-1B-Instruct.GGUF',
  'DeepSeek-R1-Distill-Qwen-1.5B': 'medmekk/DeepSeek-R1-Distill-Qwen-1.5B.GGUF',
  'Qwen2-0.5B-Instruct': 'medmekk/Qwen2.5-0.5B-Instruct.GGUF',
  'SmolLM2-1.7B-Instruct': 'medmekk/SmolLM2-1.7B-Instruct.GGUF'
}

const AISettingsScreen = () => {
  const { selectedModel, setSelectedModel, setIsModelLoaded, setModelPath } =
    useModel()
  const [selectedModelFormat, setSelectedModelFormat] = useState<string>('')
  const [availableGGUFs, setAvailableGGUFs] = useState<string[]>([])
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [isDownloading, setIsDownloading] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const [downloadedModels, setDownloadedModels] = useState<string[]>([])
  const [selectedGGUF, setSelectedGGUF] = useState<string | null>(null)

  const fetchAvailableGGUFs = async (modelFormat: string) => {
    setIsFetching(true)
    try {
      const response = await axios.get(
        `https://huggingface.co/api/models/${HF_TO_GGUF[modelFormat as keyof typeof HF_TO_GGUF]}`
      )
      const files = response.data.siblings.filter((file: any) =>
        file.rfilename.endsWith('.gguf')
      )
      setAvailableGGUFs(files.map((file: any) => file.rfilename))
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch .gguf files from Hugging Face API.')
    } finally {
      setIsFetching(false)
    }
  }

  const handleFormatSelection = (format: string) => {
    setSelectedModelFormat(format)
    setAvailableGGUFs([])
    fetchAvailableGGUFs(format)
  }

  const checkDownloadedModels = async () => {
    try {
      const files = await RNFS.readDir(RNFS.DocumentDirectoryPath)
      const ggufFiles = files
        .filter(file => file.name.endsWith('.gguf'))
        .map(file => file.name)
      setDownloadedModels(ggufFiles)
    } catch (error) {
      console.error('Error checking downloaded models:', error)
    }
  }

  React.useEffect(() => {
    checkDownloadedModels()
  }, [])

  const checkFileExists = async (filePath: string) => {
    try {
      const fileExists = await RNFS.exists(filePath)
      return fileExists
    } catch (error) {
      return false
    }
  }

  const handleGGUFSelection = (file: string) => {
    setSelectedGGUF(file)
    Alert.alert(
      'Confirm Download',
      `Do you want to download ${file} ?`,
      [
        {
          text: 'No',
          onPress: () => setSelectedGGUF(null),
          style: 'cancel'
        },
        { text: 'Yes', onPress: () => handleDownloadAndLoad(file) }
      ],
      { cancelable: false }
    )
  }

  const handleDownloadAndLoad = async (file: string) => {
    await handleDownloadModel(file)
  }

  const handleDownloadModel = async (file: string) => {
    const downloadUrl = `https://huggingface.co/${HF_TO_GGUF[selectedModelFormat as keyof typeof HF_TO_GGUF]}/resolve/main/${file}`
    setIsDownloading(true)
    setProgress(0)
    const destPath = `${RNFS.DocumentDirectoryPath}/${file}`
    if (await checkFileExists(destPath)) {
      const success = await loadModel(file)
      if (success) {
        Alert.alert(
          'Info',
          `File ${destPath} already exists, we will load it directly.`
        )
        setIsDownloading(false)
        return
      }
    }
    try {
      const destPath = await downloadModel(file, downloadUrl, progress =>
        setProgress(progress)
      )
      Alert.alert('Success', `Model downloaded to: ${destPath}`)
      await loadModel(file)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      Alert.alert('Error', `Download failed: ${errorMessage}`)
    } finally {
      setIsDownloading(false)
    }
  }

  const loadModel = async (modelName: string) => {
    try {
      const destPath = `${RNFS.DocumentDirectoryPath}/${modelName}`
      await releaseAllLlama()
      setSelectedModel(modelName)
      setModelPath(destPath)
      setIsModelLoaded(true)
      Alert.alert('Model Loaded', 'The model was successfully loaded.')
      return true
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      Alert.alert('Error Loading Model', errorMessage)
      setIsModelLoaded(false)
      return false
    }
  }

  return (
    <SafeAreaView className="bg-background flex-1">
      <TouchableOpacity
        onPress={() => router.back()}
        className="flex-row items-center justify-start gap-2 p-2">
        <ArrowLeft height={20} width={20} />
        <Text>Back to settings</Text>
      </TouchableOpacity>
      <ModelSelection
        modelFormats={modelFormats}
        selectedModelFormat={selectedModelFormat}
        handleFormatSelection={handleFormatSelection}
        availableGGUFs={availableGGUFs}
        isFetching={isFetching}
        downloadedModels={downloadedModels}
        selectedGGUF={selectedGGUF}
        handleGGUFSelection={handleGGUFSelection}
        loadModel={loadModel}
        setCurrentPage={() => {}}
        setSelectedGGUF={setSelectedGGUF}
      />
    </SafeAreaView>
  )
}

export default AISettingsScreen
