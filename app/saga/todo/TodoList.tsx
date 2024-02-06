'use client'

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, sagaTodoSelector } from '@slices/sagaTodoSlice';

const TodoList: React.FC = () => {
    const { todos, status } = useSelector(sagaTodoSelector);
    const dispatch = useDispatch();

    if (status === 'loading') {
        return <h2>loading todo List</h2>
    }

    return <>
        {status == "adding" && <h2>async adding a todo</h2>}
        <ul>
            {todos.map((todo) => (
                <li key={todo.id}>
                    {todo.title}
                    <button onClick={() => dispatch(removeTodo(todo.id))}>Remove</button>
                </li>
            ))}
        </ul>
    </>
}

export const TodoWidget: React.FC = () => {
    const dispatch = useDispatch();
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            dispatch({ type: 'sagaTodo/addTodoAsync', payload: newTodo });
            setNewTodo('');
        }
    };

    useEffect(() => {
        dispatch({ type: 'sagaTodo/fetchTodos' });
    }, [dispatch]);

    return (
        <div>
            <h1>Todo List (with Redux-Saga)</h1>
            <p>Thunk free asynchronous fetch and add actions with action state UI</p>
            <div>
                <input
                    type="text"
                    placeholder="Enter a new todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button onClick={handleAddTodo}>Add</button>
            </div>
            <TodoList />
        </div>
    );
};

export default TodoWidget;
