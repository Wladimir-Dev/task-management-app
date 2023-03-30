import React, { useId, useState } from 'react'
import { useTask } from '../../hooks/useTask'
import { CloseIcon } from '../Icons'

import styles from './styles.module.css'

export const FormTask = ({ showWindow }) => {
  const titleId = useId()
  const descriptionId = useId()
  const statusSelectId = useId()
  const [subTasks, setSubTasks] = useState([{ id: 'w1', title: '' }])
  const { currentBoard, createTask } = useTask()

  const generarId = () => {
    return Math.random()
  }
  const handleDeleteRow = (id) => {
    let aux = [...subTasks]

    aux = aux.filter((item) => item.id !== id)
    setSubTasks(aux)
  }

  const handleNewRow = () => {
    const auxSubTasks = [...subTasks]
    const newId = generarId()
    auxSubTasks.push({ id: newId, title: '' })
    setSubTasks(auxSubTasks)
  }

  const handleClose = () => {
    showWindow(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const columnId = e.target.statusSelectId.value

    const auxSubTasks = subTasks.map((subTask) => ({
      title: subTask.title,
      isCompleted: false
    }))

    const indexColumn = currentBoard.columns.findIndex(
      (column) => column.id.toString() === columnId.toString()
    )
    const objAux = {
      id: generarId(),
      title: e.target.titleId.value,
      description: e.target.descriptionId.value,
      status: currentBoard.columns[indexColumn].name,
      statusId: columnId,
      subtasks: auxSubTasks
    }
    createTask({ idBoard: currentBoard.id, indexColumn, task: objAux })
    handleClose()
  }

  return (
    <form className={styles.newTask} onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      <fieldset>
        <label htmlFor={titleId}>Title</label>
        <input type='text' id={titleId} name='titleId' />
      </fieldset>
      <fieldset>
        <label htmlFor={descriptionId}>Description</label>
        <textarea name='descriptionId' id={descriptionId} cols='30' rows='10' />
      </fieldset>
      <fieldset>
        <label htmlFor=''>Subtasks</label>
        {subTasks.map((subTask) => (
          <div key={subTask.id} className={styles.containerInput}>
            <input id={subTask.id} type='text' defaultValue={subTask.title} />
            {subTasks.length > 1 && (
              <button type='button' onClick={() => handleDeleteRow(subTask.id)}>
                <CloseIcon />
              </button>
            )}
          </div>
        ))}
        <button
          type='button'
          onClick={handleNewRow}
          className={styles.whiteButton}
        >
          + Add new subtask
        </button>
      </fieldset>
      <fieldset>
        <label htmlFor={statusSelectId}>Status</label>
        <select id={statusSelectId} name='statusSelectId'>
          {currentBoard.columns.map((column) => (
            <option key={column.id} value={column.id}>
              {column.name}
            </option>
          ))}
        </select>
      </fieldset>
      <button type='submit' className={styles.blueButton}>
        Create Task
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
