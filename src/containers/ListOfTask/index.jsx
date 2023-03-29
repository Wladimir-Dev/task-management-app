import React from 'react'
import { CardTask } from '../../components/CardTask'
import styles from './styles.module.css'
export const ListOfTask = ({ column }) => {
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
          column.tasks.length === 0 && styles.listEmpty
        }`}
      >
        {column.tasks.map((task) => (
          <CardTask key={task.id} title={task.title} subTasks={task.subtasks} />
        ))}
      </section>
    </section>
  )
}
