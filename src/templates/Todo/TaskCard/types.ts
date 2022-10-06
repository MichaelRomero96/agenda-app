import { ColorProps } from '../../../atoms/CardGradient/types'

export interface ToDoCardTaskProps {
  descriptionTask: string
  cardGradientColors?: ColorProps
  id: string
  handleDeleteTodo: (id: string) => void
}
