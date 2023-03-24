import React, { useState } from 'react'
import { CloseIcon } from '../Icons'

import styles from './styles.module.css'

export const NewBoard = () => {
  const [columns, setColumns] = useState([{ id: 'ip1', value: '' }])

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
  console.log('render')
  console.log(columns)
  return (
    <form className={styles.newBoard}>
      <h2>add new board</h2>
      <fieldset>
        <label htmlFor=''>name</label>
        <input type='text' name='' id='' />
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
    </form>
  )
}
