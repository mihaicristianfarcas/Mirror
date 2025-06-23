import { useLocalSearchParams } from 'expo-router'
import { Text } from 'react-native'

const Note = () => {
  const { id } = useLocalSearchParams()
  return <Text>Note Details for {id}</Text>
}

export default Note
