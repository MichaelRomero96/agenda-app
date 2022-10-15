import { ColorProps } from '../../../Atoms/CardGradient/types'

export interface ToDoCardTaskProps {
  descriptionTask: string
  cardGradientColors?: ColorProps
  id: string
  handleDeleteTodo: (id: string) => void
}
