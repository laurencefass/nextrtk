'use client'

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, sagaTodoSelector } from '@slices/sagaTodoSlice';

import "@styles/todo.css";

const TodoList: React.FC = () => {
    const { todos, status } = useSelector(sagaTodoSelector);
    const dispatch = useDispatch();

    if (status === 'loading') {
        return <h2>loading todo List</h2>
    }

    return <>
        {status == "adding" && <h2>async adding a todo</h2>}
        <ul className="todo-list">
            {todos.map((todo) => (
                <li className="todo-list-item" key={todo.id}>
                    {todo.title}
                    <button onClick={() => dispatch(deleteTodo(todo.id))}>Remove</button>
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
