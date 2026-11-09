import { useMemo, useState } from 'react'
import TodoForm from './components/TodoForm.jsx'
import TodoItem from './components/TodoItem.jsx'
import FilterBar from './components/FilterBar.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'

function createId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export default function App() {
  const [todos, setTodos] = useLocalStorage('todo-app:todos', [])
  const [filter, setFilter] = useState('all')

  function addTodo(text) {
    setTodos((prev) => [{ id: createId(), text, completed: false, createdAt: Date.now() }, ...prev])
  }

  function toggleTodo(id) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  function editTodo(id, text) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)))
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed))
  }

  const visibleTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed)
    if (filter === 'completed') return todos.filter((t) => t.completed)
    return todos
  }, [todos, filter])

  const completedCount = todos.filter((t) => t.completed).length
  const activeCount = todos.length - completedCount

  return (
    <main className="app">
      <header className="app-header">
        <h1>Todo</h1>
        <p className="subtitle">Plan your day, one task at a time.</p>
      </header>

      <section className="card">
        <TodoForm onAdd={addTodo} />

        {visibleTodos.length > 0 ? (
          <ul className="todo-list">
            {visibleTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
          </ul>
        ) : (
          <p className="empty">
            {todos.length === 0 ? 'No tasks yet. Add your first one above.' : 'Nothing here for this filter.'}
          </p>
        )}

        {todos.length > 0 && (
          <FilterBar
            filter={filter}
            onChange={setFilter}
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={clearCompleted}
          />
        )}
      </section>

      <footer className="app-footer">Double-click a task to edit it. Your tasks are saved in this browser.</footer>
    </main>
  )
}
