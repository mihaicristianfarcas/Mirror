import React, { createContext, useContext, useState } from 'react'

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
