import { Plus } from '@/lib/icons'
import { Button } from './ui/button'

interface FloatingActionButtonProps {
  onPress?: () => void
}

const FloatingActionButton = ({ onPress }: FloatingActionButtonProps) => {
  return (
    <Button
      onPress={onPress}
      className="absolute bottom-8 right-4 h-16 w-16 items-center justify-center rounded-full bg-accent shadow-lg active:bg-accent/90">
      <Plus size={24} color="white" strokeWidth={2.5} />
    </Button>
  )
}

export default FloatingActionButton
