import { releaseAllLlama } from 'llama.rn'
import React, { createContext, useContext, useEffect, useState } from 'react'
import RNFS from 'react-native-fs'

interface ModelContextType {
  selectedModel: string | null
  setSelectedModel: (model: string | null) => void
  isModelLoaded: boolean
  setIsModelLoaded: (loaded: boolean) => void
  modelPath: string | null
  setModelPath: (path: string | null) => void
}

const ModelContext = createContext<ModelContextType | undefined>(undefined)

export const ModelProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [isModelLoaded, setIsModelLoaded] = useState<boolean>(false)
  const [modelPath, setModelPath] = useState<string | null>(null)

  // Auto-load a model on startup
  useEffect(() => {
    const autoLoadModel = async () => {
      try {
        // Check if a model is already loaded
        if (isModelLoaded || selectedModel) {
          return
        }

        // Check for downloaded models
        const files = await RNFS.readDir(RNFS.DocumentDirectoryPath)
        const ggufFiles = files
          .filter(file => file.name.endsWith('.gguf'))
          .map(file => file.name)

        if (ggufFiles.length === 0) {
          console.log('No models found for auto-loading')
          return // No models downloaded
        }

        // Prefer DeepSeek models (as requested)
        const deepseekModel = ggufFiles.find(file =>
          file.toLowerCase().includes('deepseek')
        )

        const modelToLoad = deepseekModel || ggufFiles[0] // Fallback to first available
        const autoModelPath = `${RNFS.DocumentDirectoryPath}/${modelToLoad}`

        // Set the model
        await releaseAllLlama()
        setSelectedModel(modelToLoad)
        setModelPath(autoModelPath)
        setIsModelLoaded(true)

        console.log(`Auto-loaded model: ${modelToLoad}`)

        // Optional: Show a brief, non-blocking success message
        // Commented out to avoid interrupting user experience on startup
        // Alert.alert(
        //   'Model Auto-Loaded',
        //   `Successfully loaded ${modelToLoad}`,
        //   [{ text: 'OK' }],
        //   { cancelable: true }
        // )
      } catch (error) {
        console.error('Error auto-loading model:', error)
        // Don't show an alert here as it might interrupt the user experience
        // The user can manually load a model if needed
      }
    }

    autoLoadModel()
  }, [isModelLoaded, selectedModel]) // Run when these values change

  return (
    <ModelContext.Provider
      value={{
        selectedModel,
        setSelectedModel,
        isModelLoaded,
        setIsModelLoaded,
        modelPath,
        setModelPath
      }}>
      {children}
    </ModelContext.Provider>
  )
}

export const useModel = () => {
  const context = useContext(ModelContext)
  if (!context) {
    throw new Error('useModel must be used within a ModelProvider')
  }
  return context
}
