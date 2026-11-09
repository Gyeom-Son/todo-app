const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
]

export default function FilterBar({ filter, onChange, activeCount, completedCount, onClearCompleted }) {
  return (
    <div className="filter-bar">
      <span className="count">
        {activeCount} {activeCount === 1 ? 'task' : 'tasks'} left
      </span>

      <div className="filters" role="group" aria-label="Filter tasks">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            className={`btn btn-filter${filter === key ? ' is-active' : ''}`}
            onClick={() => onChange(key)}
            aria-pressed={filter === key}
          >
            {label}
          </button>
        ))}
      </div>

      <button className="btn btn-ghost" onClick={onClearCompleted} disabled={completedCount === 0}>
        Clear completed
      </button>
    </div>
  )
}
