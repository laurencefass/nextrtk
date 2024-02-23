'use client'

// components/TodoList.jsx (or TodoList.tsx if using TypeScript)
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Todo,
    addTodo,
    loadTodos,
    deleteTodo,
    listenerTodoSelector
} from '@slices/listenerTodoSlice';

import "@styles/todo.css"

const TodoList = () => {
    const { todos, status } = useSelector(listenerTodoSelector);
    const dispatch = useDispatch();

    const onDeleteTodo = (id: number) => {
        dispatch(deleteTodo(id));
    };

    if (status == 'loading') {
        return <h2>Asynchronous loading...</h2>
    }

    if (status == 'failed') {
        return <h2>Loading failed</h2>
    }

    return <>
        <ul className="todo-list">
            {status == 'adding' && <h2>Async add in progress...</h2>}
            {todos.map((todo: Todo) => (
                <li className="todo-list-item" key={todo.id}>
                    {todo.title}
                    <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
                </li>
            ))}
        </ul>

    </>
}

export const TodoWidget = () => {
    const [input, setInput] = useState('');
    const { todos, status } = useSelector(listenerTodoSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTodos());
    }, []);

    const onAddTodo = () => {
        const newTodo = { id: Date.now(), title: input, completed: false };
        dispatch(addTodo(newTodo));
        setInput('');
    };

    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={onAddTodo}>Add</button>
            <TodoList />
        </div>
    );
};
