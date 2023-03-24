import React, { useState, useId } from 'react'
import { useTask } from '../../hooks/useTask'
import { CloseIcon } from '../Icons'

import styles from './styles.module.css'

export const NewBoard = ({ showWindow }) => {
  const [columns, setColumns] = useState([{ id: 'ip1', value: '' }])
  const { boards, setBoards } = useTask()
  const nameId = useId()
  const generarId = () => {
    return Math.random()
  }

  const handleNewColumn = () => {
    const auxColumns = [...columns]
    const newId = generarId()

    auxColumns.push({ id: newId, value: '' })
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
    const objAux = {
      id: 3,
      name: e.target.nameId.value,
      columns: columns.map((column) => ({
        id: column.id,
        name: document.getElementById(column.id).value
      }))
    }
    const auxBoards = [...boards, objAux]
    setBoards(auxBoards)
    console.log(auxBoards)
  }

  return (
    <form className={styles.newBoard} onSubmit={handleSubmit}>
      <h2>add new board</h2>
      <fieldset>
        <label htmlFor={nameId}>name</label>
        <input type='text' id={nameId} name='nameId' />
      </fieldset>
      <fieldset>
        <label htmlFor=''>columns</label>
        {columns.map((column) => (
          <div key={column.id} className={styles.containerInput}>
            <input id={column.id} type='text' defaultValue={column.value} />
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
        Create New Board
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
