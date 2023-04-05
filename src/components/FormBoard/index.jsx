import React, { useState, useId, useEffect } from 'react'
import { useTask } from '../../hooks/useTask'
import { CloseIcon } from '../Icons'

import styles from './styles.module.css'
import tablet from './tablet.module.css'

export const FormBoard = ({
  showWindow,
  board = undefined,
  newColumn = false,
}) => {
  const [columns, setColumns] = useState(
    board?.columns || [{ id: 'ip1', name: '' }]
  )
  const { updateBoard, createBoard } = useTask()
  const nameId = useId()

  useEffect(() => {
    if (newColumn) {
      const auxColumns = columns.map((column) => {
        return {
          ...column,
          disable: true,
        }
      })
      setColumns(auxColumns)
    }
  }, [])

  const generarId = () => {
    return Math.random()
  }

  const handleNewColumn = () => {
    const auxColumns = [...columns]
    const newId = generarId()

    auxColumns.push({ id: newId, name: '', tasks: [] })
    setColumns(auxColumns)
  }
  const handleDeleteColumn = (id) => {
    let aux = [...columns]

    aux = aux.filter((item) => item.id != id)
    setColumns(aux)
  }
  const handleClose = () => {
    showWindow(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    if (board) {
      const auxColumns = columns.map((column) => ({
        id: column.id,
        name: document.getElementById(column.id).value,
        tasks: column.tasks,
      }))

      updateBoard(board.id, e.target.nameId.value, auxColumns)
    } else {
      const auxColumns = columns.map((column) => ({
        id: column.id,
        name: document.getElementById(column.id).value,
        tasks: [],
      }))
      const objAux = {
        id: 3,
        name: e.target.nameId.value,
        columns: auxColumns,
      }
      createBoard(objAux)
    }
    showWindow(false)
  }

  return (
    <section className={`${tablet.containerForm}`}>
      <form
        className={`${styles.newBoard} ${tablet.newBoard}`}
        onSubmit={handleSubmit}
      >
        {board ? <h2>edit board</h2> : <h2>add new board</h2>}
        <fieldset>
          <label htmlFor={nameId}>name</label>
          <input
            type='text'
            id={nameId}
            name='nameId'
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
    </section>
  )
}
