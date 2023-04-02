import { useTask } from '../../hooks/useTask'
import { ListOfTask } from '../ListOfTask'

import styles from './styles.module.css'
import React, { useState } from 'react'
import { FormBoard } from '../../components/FormBoard'
import { createPortal } from 'react-dom'

export const GroupTask = () => {
  const { currentBoard } = useTask()
  const [showNewColumn, setShowNewColumn] = useState(false)

  return (
    <section className={styles.groupTask}>
      {currentBoard.columns.map((column) => (
        <ListOfTask key={column.id} column={column} />
      ))}
      <button
        type='button'
        className={styles.newColumn}
        onClick={() => setShowNewColumn(true)}
      >
        + new column
      </button>
      {showNewColumn &&
        createPortal(
          <FormBoard
            showWindow={setShowNewColumn}
            board={currentBoard}
            newColumn
          />,
          document.body
        )}
    </section>
  )
}
