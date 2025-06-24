import { Text } from '@/components/ui/text'
import { useLocalSearchParams } from 'expo-router'

const Note = () => {
  const { id } = useLocalSearchParams()
  return <Text>Note Details for {id}</Text>
}

export default Note
