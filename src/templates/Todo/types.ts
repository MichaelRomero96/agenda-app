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
