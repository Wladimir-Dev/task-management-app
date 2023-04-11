import React from 'react'

import styles from './styles.module.css'
import { useBoard } from '../../hooks/useBoard'

export const CardTask = ({ title, subTasks }) => {
  const { modoLight } = useBoard()
  const nCompleted = subTasks.filter((subTask) => subTask.isCompleted)

  return (
    <article className={`${modoLight && styles.onLight} ${styles.cardTask}`}>
      <h3>{title}</h3>
      <span>
        {nCompleted.length} de {subTasks.length}subtasks
      </span>
    </article>
  )
}
