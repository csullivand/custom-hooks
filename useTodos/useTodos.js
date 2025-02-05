import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

const init = ()=>{
    return JSON.parse(localStorage.getItem("todos")) || [];
}
export const useTodos = () => {
    const [todos, dispatch] = useReducer(todoReducer, [],init);

    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
    
    }, [todos]);
    
    const handleNewTodo = (newTodo) => {
        const action = {
            type: 'Add todo',
            payload: newTodo
        }

        dispatch(action);
    }

    const handleDeleteTodo = (id)=>{
        dispatch({
            type: 'Delete todo',
            payload: id
        })

    }

    const handleToggleTodo = (id)=>{


        dispatch({
            type: 'Toggle todo',
            payload: id
        })
    }
    return {
        todos,
        todosCount: todos.length, 
        pendingTodos : todos.filter(todo => !todo.done).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    }
}
