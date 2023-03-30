import React from 'react'
import { useTask } from '../../hooks/useTask'
import styles from './styles.module.css'
export const Ver = () => {
  const { boards } = useTask()
  return (
    <div className={styles.ver}>
      {boards.map((board) => (
        <div>
          {board.name}
          {board.columns.map((column) => (
            <div>
              {column.name}
              {column.tasks.map((task) => (
                <div>
                  {task.title}
                  {task.subtasks.map((item) => (
                    <div>{item.title}</div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
