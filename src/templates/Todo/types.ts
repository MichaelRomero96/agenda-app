import { ColorProps } from '../../Atoms/CardGradient/types'

export interface Todo {
  id: string
  description: string
  status: TodoStatus
  done: boolean
}

export enum TodoStatus {
  unfinished = 'Unfinished',
  done = 'Done',
}

export interface ToDoCardTaskProps {
  descriptionTask: string
  cardGradientColors?: ColorProps
  id: string
  handleDeleteTodo: (id: string) => void
}
