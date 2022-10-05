import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { v4 as uuid } from 'uuid'
import { Button, Text, Grid, TextInput } from '@mantine/core'
import useLocalStorage from '../../hooks/useLocalStorage'
import { Todo, TodoStatus } from './types'
import useStyles from './styles'

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
    <>
      <Text
        align="center"
        variant="gradient"
        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
        size="xl"
        weight="800"
        color="dimmed"
        style={{ fontFamily: 'Greycliff CF, sans-serif' }}
      >
        TODO List
      </Text>

      <Grid justify="center" className={classes.addTaskContainer}>
        <Grid.Col span={6}>
          <TextInput onChange={handleChange} type="text" value={todo} />
          {displayError()}
        </Grid.Col>

        <div style={{ display: 'flex' }}>
          <Grid.Col span={6}>
            <Button
              onClick={handleClick}
              variant="outline"
              color="indigo"
              radius="lg"
            >
              Add task
            </Button>
          </Grid.Col>

          <Grid.Col span={3}>
            <Button
              onClick={handleDeleteTodoList}
              variant="outline"
              color="indigo"
              radius="lg"
            >
              Delete All
            </Button>
          </Grid.Col>
        </div>
      </Grid>
      {todoList.map(({ id, description, status, done }: Todo) => (
        <li key={id}>
          <span>{description}</span>
          <br />
          <span>
            Status: <b>{status}</b>
          </span>
          <input
            onChange={(e) => handleChangeTodoStatus(e, id)}
            type="checkbox"
            defaultChecked={done}
          />
          <Button onClick={() => handleDeleteToDo(id)}>Delete task</Button>
        </li>
      ))}
    </>
  )
}

export default ToDo
