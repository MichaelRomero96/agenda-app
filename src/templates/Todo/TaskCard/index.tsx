import { Menu, Text } from '@mantine/core'
import CardGradient from '../../../Atoms/CardGradient'
import { ToDoCardTaskProps } from './types'

export default function TaskCard({
  descriptionTask,
  cardGradientColors,
  id,
  handleDeleteTodo,
}: ToDoCardTaskProps) {
  const handleOpenMenu = () => {
    // do something
  }
  return (
    <>
      <CardGradient colors={cardGradientColors}>
        <Text onClick={() => handleOpenMenu()}>{descriptionTask}</Text>
        <Menu.Target>
          <span>menu_icon</span>
        </Menu.Target>
      </CardGradient>

      <Menu.Dropdown>
        <Menu.Label>Options</Menu.Label>
        <Menu.Item>Edit Task</Menu.Item>
        <Menu.Item onClick={() => handleDeleteTodo(id)}>Delete Task</Menu.Item>
      </Menu.Dropdown>
    </>
  )
}
