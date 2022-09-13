import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { v4 as uuid } from 'uuid';
import useLocalStorage from '../../hooks/useLocalStorage';
import styles from './styles.module.scss';
import { Todo, TodoStatus } from './types';


function TodoUI() {

    const [todo, setTodo] = useState<string>('');
    const [displayMessage, setDisplayMessage] = useState(false);
    const [todoList, setTodoList] = useLocalStorage<Todo[]>('todoList', [])

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
            status: TodoStatus.unfinished,
            done: false,
            delete: false
        }])
        setTodo('')
    }

    const handleDeleteTodoList = () => setTodoList([]);

    const handleDeleteToDo = (id: string) => {
        setTodoList((prev: Todo[]) => prev.filter((toDo) => {
            return id !== toDo.id
        }));
    };

    const handleChangeTodoStatus = ({ target }: ChangeEvent<HTMLInputElement>, id: string) => {
        const { checked } = target
        const { done, unfinished, } = TodoStatus
        setTodoList(todoList.map((todo: Todo) => {
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
        if (todoList.length === 0) return;
        setTodoList(todoList)
    }, [todoList])


    const displayError = () => displayMessage ? <h2>Must type a todo</h2> : null

    return (
        <>
            <h1 className={styles.h1}>TODO List</h1>
            <input onChange={handleChange} type="text" value={todo} />
            {displayError()}
            <button onClick={handleClick}>Add task</button>
            <button onClick={handleDeleteTodoList}>Delete All</button>
            {
                todoList.map(({ id, description, status, done }: Todo) => (
                    <li key={id}>
                        <span>{description}</span>
                        <br />
                        <span>Status: <b>{status}</b></span>
                        <input
                            onChange={(e) => handleChangeTodoStatus(e, id)}
                            type="checkbox"
                            defaultChecked={done} />
                        <button onClick={() => handleDeleteToDo(id)} >
                            Delete task
                        </button>
                    </li>
                ))
            }

        </>
    )
}

export default TodoUI
