import React, { useState, useId } from 'react'
import { useTask } from '../../hooks/useTask'
import { CloseIcon } from '../Icons'

import styles from './styles.module.css'

export const FormBoard = ({ showWindow, board = undefined }) => {
  const [columns, setColumns] = useState(
    board?.columns || [{ id: 'ip1', name: '' }]
  )
  const { updateBoard, createBoard } = useTask()
  const nameId = useId()

  const generarId = () => {
    return Math.random()
  }

  const handleNewColumn = () => {
    const auxColumns = [...columns]
    const newId = generarId()

    auxColumns.push({ id: newId, name: '' })
    setColumns(auxColumns)
  }
  const handleDeleteColumn = (id) => {
    let aux = [...columns]

    aux = aux.filter((item) => item.id !== id)
    setColumns(aux)
  }
  const handleClose = () => {
    showWindow(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const auxColumns = columns.map((column) => ({
      id: column.id,
      name: document.getElementById(column.id).value
    }))

    if (board) {
      updateBoard({
        idNewBoard: board.id,
        nameBoard: e.target.nameId.value,
        columnsBoard: auxColumns
      })
    } else {
      const objAux = {
        id: 3,
        name: e.target.nameId.value,
        columns: auxColumns
      }
      createBoard(objAux)
    }
    showWindow(false)
  }

  return (
    <form className={styles.newBoard} onSubmit={handleSubmit}>
      {board ? <h2>edit board</h2> : <h2>add new board</h2>}
      <fieldset>
        <label htmlFor={nameId}>name</label>
        <input
          type='text'
          id={nameId}
          name='nameId'
          defaultValue={board && board.name}
        />
      </fieldset>
      <fieldset>
        <label htmlFor=''>columns</label>
        {columns.map((column) => (
          <div key={column.id} className={styles.containerInput}>
            <input id={column.id} type='text' defaultValue={column.name} />
            {columns.length > 1 && (
              <button
                type='button'
                onClick={() => handleDeleteColumn(column.id)}
              >
                <CloseIcon />
              </button>
            )}
          </div>
        ))}
        <button
          type='button'
          onClick={handleNewColumn}
          className={styles.whiteButton}
        >
          + Add new Column
        </button>
      </fieldset>

      <button type='submit' className={styles.blueButton}>
        {board ? 'save changes' : 'Create New Board'}
      </button>
      <button
        type='button'
        className={styles.closeButton}
        onClick={handleClose}
      >
        <CloseIcon />
      </button>
    </form>
  )
}
