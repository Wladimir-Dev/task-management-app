import React, { useState } from 'react'
import { createPortal } from 'react-dom'

import { ListOfTask } from '../ListOfTask'
import { FormBoard } from '../../components/FormBoard'

import { useBoard } from '../../hooks/useBoard'

import styles from './styles.module.css'
import tablet from './tablet.module.css'

export const GroupTask = () => {
  const { currentBoard } = useBoard()
  const [showNewColumn, setShowNewColumn] = useState(false)

  return (
    <section className={`${styles.groupTask} ${tablet.groupTask}`}>
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
