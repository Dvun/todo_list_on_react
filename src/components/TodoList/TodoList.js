import React from 'react'
import './TodoList.scss'
import TodoListItem from './TodoListItem/TodoListItem'


const ToDoList = ({todoData, onDeleted, onToggleImportant, onToggleDone}) => {


  const toDoListElements = todoData.map((item) => {
    const {id, ...itemProps} = item
    return <li className='list-group-item' key={id}>
      <TodoListItem {...itemProps}
                    onDeleted ={() => onDeleted(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                    onToggleDone={() => onToggleDone(id)}
      />
    </li>
  })

  return (
      <ul className='list-group todo-list'>
        {toDoListElements}
      </ul>
  )
}

export default ToDoList
