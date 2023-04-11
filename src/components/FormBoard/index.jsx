import React, { useState, useId, useEffect } from 'react'

import { CloseIcon } from '../Icons'
import { useBoard } from '../../hooks/useBoard'
import { useItem } from '../../hooks/useItem'

import styles from './styles.module.css'
import tablet from './tablet.module.css'

export const FormBoard = ({
  showWindow,
  board = undefined,
  newColumn = false
}) => {
  const initColumns = [{ id: 'ip1', name: '' }]

  const [columns, setColumns] = useState(board?.columns || initColumns)
  const { updateBoard, createBoard, modoLight } = useBoard()
  const { addNewItem, removeItem, generarId } = useItem()
  const inputNameId = useId()

  useEffect(() => {
    if (newColumn) {
      const auxColumns = columns.map((column) => {
        return {
          ...column,
          disable: true
        }
      })
      setColumns(auxColumns)
    }
  }, [])

  const handleNewColumn = () => {
    setColumns(addNewItem(columns, true))
  }

  const handleDeleteColumn = (id) => {
    setColumns(removeItem(columns, id))
  }

  const handleClose = () => {
    showWindow(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const auxColumns = columns.map((column) => ({
      id: column.id,
      name: document.getElementById(column.id).value,
      tasks: column.tasks || []
    }))

    if (board) {
      updateBoard(board.id, e.target.inputNameId.value, auxColumns)
    } else {
      const objAux = {
        id: generarId(),
        name: e.target.inputNameId.value,
        columns: auxColumns
      }
      createBoard(objAux)
    }
    showWindow(false)
  }

  return (
    <section className={`${tablet.containerForm}`}>
      <form
        className={`${modoLight && styles.onLight} ${styles.newBoard} ${tablet.newBoard}`}
        onSubmit={handleSubmit}
      >
        {board ? <h2>edit board</h2> : <h2>add new board</h2>}
        <fieldset>
          <label htmlFor={inputNameId}>name</label>
          <input
            type='text'
            id={inputNameId}
            name='inputNameId'
            defaultValue={board && board.name}
            disabled={newColumn}
            className={newColumn && styles.disable}
          />
        </fieldset>
        <fieldset>
          <label htmlFor=''>columns</label>
          {columns.map((column) => (
            <div key={column.id} className={styles.containerInput}>
              <input
                id={column.id}
                type='text'
                defaultValue={column.name}
                disabled={column.disable}
                className={column.disable && styles.disable}
              />
              {columns.length > 1 && (
                <button
                  type='button'
                  disabled={column.disable}
                  className={column.disable && styles.disable}
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
            className={`${modoLight && styles.onLightButton} ${styles.whiteButton}`}
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
    </section>
  )
}
