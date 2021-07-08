import React, { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle }) => {
  const [isExpand, setIsExpand] = useState(false)

  const expandList = () => {
    setIsExpand(!isExpand)
  }

  return (
    <div
      className={`task ${task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}{' '}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{task.day}</p>
      {isExpand && <p>Note: {task.note}</p>}
      {task.note !== '' && (
        <button className='more-btn' onClick={expandList}>
          {isExpand ? 'show less' : 'show more'}
        </button>
      )}
    </div>
  )
}

export default Task
