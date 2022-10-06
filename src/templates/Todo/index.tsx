import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { v4 as uuid } from 'uuid'
import { Button, Grid, TextInput, Title, Menu, Container } from '@mantine/core'
import useLocalStorage from '../../hooks/useLocalStorage'
import { Todo, TodoStatus } from './types'
import useStyles from './styles'
import TaskCard from './TaskCard'
import theme from '../../theme'

function ToDo() {
  const [todo, setTodo] = useState<string>('')
  const [displayMessage, setDisplayMessage] = useState(false)
  const [todoList, setTodoList] = useLocalStorage<Todo[]>('todoList', [])
  const { classes } = useStyles()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  }

  const handleClick = () => {
    if (todo.trim().length === 0) {
      setDisplayMessage(true)
      return
    }
    setDisplayMessage(false)

    setTodoList([
      ...todoList,
      {
        description: todo,
        id: uuid(),
        status: TodoStatus.unfinished,
        done: false,
        delete: false,
      },
    ])
    setTodo('')
  }

  const handleDeleteTodoList = () => setTodoList([])

  const handleDeleteToDo = (id: string) => {
    setTodoList((prev: Todo[]) => prev.filter((toDo) => id !== toDo.id))
  }

  const handleChangeTodoStatus = (
    { target }: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { checked } = target
    const { done, unfinished } = TodoStatus
    setTodoList(
      todoList.map((toDo: Todo) => {
        if (toDo.id === id) {
          return {
            ...toDo,
            status: checked ? done : unfinished,
            done: checked,
          }
        }
        return todo
      })
    )
  }

  useEffect(() => {
    if (todoList.length === 0) return
    setTodoList(todoList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoList])

  const displayError = () => (displayMessage ? <h2>Must type a todo</h2> : null)

  return (
    <Container>
      <Title order={2} align="center" color={theme.primaryColor} weight="800">
        TODO List
      </Title>

      <Grid justify="center" align="center" gutter="xs">
        <Grid.Col span={8}>
          <TextInput
            placeholder="Type a task"
            onChange={handleChange}
            type="text"
            value={todo}
          />
          {displayError()}
        </Grid.Col>
        <Container>
          <Grid.Col>
            <Button onClick={handleClick} variant="filled" radius="md">
              Add task
            </Button>
          </Grid.Col>

          <Grid.Col>
            <Button onClick={handleDeleteTodoList} variant="filled" radius="md">
              Delete All
            </Button>
          </Grid.Col>
        </Container>
      </Grid>

      <Grid justify="center" mt={10} gutter="xs">
        {todoList.map(({ id, description }: Todo) => (
          <Grid.Col key={id} span={8}>
            <Menu>
              <TaskCard
                descriptionTask={description}
                id={id}
                handleDeleteTodo={handleDeleteToDo}
              />
            </Menu>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  )
}

export default ToDo
