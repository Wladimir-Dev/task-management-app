import React, { useState, useRef } from 'react'
import { CardTask } from '../../components/CardTask'
import { Task } from '../../components/Task'

import styles from './styles.module.css'
import { createPortal } from 'react-dom'

export const ListOfTask = ({ column }) => {
  const [showTask, setShowTask] = useState(false)
  const taskRef = useRef()
  const handleClickCard = (task) => {
    setShowTask(true)
    taskRef.current = task
  }
  return (
    <section className={styles.listOfTask}>
      <section className={styles.header}>
        <div />
        <h2>
          {column.name}({column.tasks.length})
        </h2>
      </section>
      <section
        className={`${styles.body} ${
          column.tasks.length == 0 && styles.listEmpty
        }`}
      >
        {column.tasks.map((task) => (
          <div key={task.id} onClick={() => handleClickCard(task)}>
            <CardTask title={task.title} subTasks={task.subtasks} />
          </div>
        ))}
      </section>
      {showTask &&
        createPortal(
          <Task task={taskRef.current} showWindow={setShowTask} />,
          document.body
        )}
    </section>
  )
}
