import React from 'react'
import { useTask } from '../../hooks/useTask'
import { ListOfTask } from '../ListOfTask'

import styles from './styles.module.css'

export const GroupTask = () => {
  const { currentBoard } = useTask()

  return (
    <section className={styles.groupTask}>
      {currentBoard.columns.map((column) => (
        <ListOfTask key={column.id} column={column} />
      ))}
      <section>
        new column
      </section>
    </section>
  )
}
