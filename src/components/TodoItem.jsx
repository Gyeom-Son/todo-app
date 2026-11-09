import { useEffect, useRef, useState } from 'react'

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditing) inputRef.current?.focus()
  }, [isEditing])

  function startEditing() {
    setDraft(todo.text)
    setIsEditing(true)
  }

  function saveEdit() {
    const trimmed = draft.trim()
    if (trimmed && trimmed !== todo.text) onEdit(todo.id, trimmed)
    setIsEditing(false)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') saveEdit()
    if (event.key === 'Escape') setIsEditing(false)
  }

  return (
    <li className={`todo-item${todo.completed ? ' is-done' : ''}`}>
      <input
        className="todo-check"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'not done' : 'done'}`}
      />

      {isEditing ? (
        <input
          ref={inputRef}
          className="todo-edit"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={handleKeyDown}
          aria-label="Edit task"
          maxLength={120}
        />
      ) : (
        <span className="todo-text" onDoubleClick={startEditing} title="Double-click to edit">
          {todo.text}
        </span>
      )}

      <div className="todo-actions">
        {!isEditing && (
          <button className="btn btn-ghost" onClick={startEditing} aria-label="Edit task">
            Edit
          </button>
        )}
        <button className="btn btn-ghost btn-danger" onClick={() => onDelete(todo.id)} aria-label="Delete task">
          Delete
        </button>
      </div>
    </li>
  )
}
