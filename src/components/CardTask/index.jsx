import React from 'react'

import styles from './styles.module.css'
export const CardTask = ({ title, subTasks }) => {
  const nCompleted = subTasks.filter((subTask) => subTask.isCompleted)
  return (
    <article className={styles.cardTask}>
      <h3>{title}</h3>
      <span>
        {nCompleted.length} de {subTasks.length}subtasks
      </span>
    </article>
  )
}
