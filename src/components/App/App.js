import React, {Component} from 'react'
import './App.scss'
import AppHeader from '../AppHeader/AppHeader'
import SearchPanel from '../SearchPanel/SearchPanel'
import ToDoList from '../TodoList/TodoList'
import ItemStatusFilter from '../ItemStatusFilter/ItemStatusFilter'
import ItemAddForm from '../ItemAddForm/ItemAddForm'


export default class App extends Component {

  maxId = 100

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ],
    term: '',
    filter: 'all' //active, all, done
  }

  createTodoItem(label) {
    return {
      id: this.maxId++,
      label,
      important: false,
      done: false,
    }
  }

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const indexOfItem = todoData.findIndex((elIndex) => elIndex.id === id)
      const newArray = [...todoData.slice(0, indexOfItem), ...todoData.slice(indexOfItem + 1)]

      return {todoData: newArray}
    })
  }
  addItem = (text) => {
    const newItem = this.createTodoItem(text)

    this.setState(({todoData}) => {
      const newArray = [...todoData, newItem]
      return {todoData: newArray}
    })
  }

  toggleProperty(arr, id, propName) {
    const indexOfItem = arr.findIndex((elementIndex) => elementIndex.id === id)
    const oldItem = arr[indexOfItem]
    const newItem = {...oldItem, [propName]: !oldItem[propName]}

    return [
      ...arr.slice(0, indexOfItem),
      newItem,
      ...arr.slice(indexOfItem + 1),
    ]
  }
  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {todoData: this.toggleProperty(todoData, id, 'done')}
    })
  }
  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {todoData: this.toggleProperty(todoData, id, 'important')}
    })
  }
  onSearchChange = (term) => {
    this.setState({term})
  }
  search = (items, term) => {
    if(term.length === 0) {
      return items
    }
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
    })
  }
  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done)
      case 'done':
        return items.filter((item) => item.done)
      default:
        return items
    }
  }

  onFilterChange = (filter) => {
    this.setState({filter})
  }

  render() {

    const {todoData, term, filter} = this.state
    const visibleItems = this.filter(this.search(todoData, term), filter)
    const doneCount = todoData.filter((item) => item.done).length
    const todoCount = todoData.length - doneCount

    return (
        <div className='todo-app'>
          <AppHeader toDo={todoCount} done={doneCount}/>
          <div className='top-panel d-flex'>
            <SearchPanel onSearchChange={this.onSearchChange}/>
            <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
          </div>
          <ToDoList
              todoData={visibleItems}
              onDeleted={this.deleteItem}
              onToggleImportant={this.onToggleImportant}
              onToggleDone={this.onToggleDone}
          />
          <ItemAddForm addItem={this.addItem}/>
        </div>
    )
  }
}
