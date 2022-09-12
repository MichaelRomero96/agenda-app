import { ChangeEvent, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Types from './types';
import useLocalStorage from '../../hooks/useLocalStorage';
import styles from './styles.scss';




function Todo() {

    const [todo, setTodo,] = useState<string>('');
    const [displayMessage, setDisplayMessage] = useState(false);
    const [todoList, setTodoList] = useLocalStorage<Types.Todo[]>('todoList', [])
    

    console.log(todoList);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTodo(e.target.value)
    }

    const handleClick = () => {
        if (todo.trim().length === 0) {
            setDisplayMessage(true);
            return;
        } else {
            setDisplayMessage(false);
        }
        setTodoList([...todoList, {
            description: todo,
            id: uuid(),
            status: Types.Status.unfinished,
            done: false,
            delete: false
        }])
        setTodo('')
    }

    const handleChangeTodoStatus = ({ target }: ChangeEvent<HTMLInputElement>, id: string) => {
        const { checked } = target
        const { done, unfinished, } = Types.Status
        setTodoList(todoList.map( todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    status: checked ? done : unfinished, 
                    done: checked
                }
            }
            return todo

        }))
    }

    useEffect(() => {
        setTodoList(todoList)
    }, [todoList])


    const displayError = () => displayMessage ? <h2>Must type a todo</h2> : null

    return (
        <>
            <h1>TODO List</h1>
            <input onChange={handleChange} type="text" value={todo} />
            {displayError()}
            <button onClick={handleClick}>Save TODO</button>
            <button onClick={handleClick}>Delete</button>
            {
                todoList.map(({ id, description, status, done }) => (
                    <li key={id}>
                        <span>{description}</span>
                        <br />
                        <span>Status: <b>{status}</b></span>
                        <input onChange={(e) => handleChangeTodoStatus(e, id)} type="checkbox" defaultChecked={done} />
                    </li>
                ))
            }

        </>
    )
}

export default Todo
