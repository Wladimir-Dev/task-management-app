import React, { useId, useState, useRef } from 'react'
import { useTask } from '../../hooks/useTask'
import { CloseIcon } from '../Icons'

import styles from './styles.module.css'
import tablet from './tablet.module.css'

export const FormTask = ({
  showWindow,
  task = undefined,
  closeWindowFather,
}) => {
  const titleId = useId()
  const descriptionId = useId()
  const statusSelectId = useId()
  const columnRef = useRef(task?.statusId)

  const { currentBoard, createTask, editTask } = useTask()
  const generarId = () => {
    return Math.random()
  }
  const initSubtasks = (subtasks) => {
    return subtasks.map((item) => {
      return {
        id: generarId(),
        title: item.title,
        isCompleted: item.isCompleted,
      }
    })
  }
  const [subTasks, setSubTasks] = useState(
    task ? initSubtasks(task.subtasks) : []
  )

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
    closeWindowFather && closeWindowFather()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const columnId = e.target.statusSelectId.value

    const auxSubTasks = subTasks.map((subTask) => ({
      title: document.getElementById(subTask.id).value,
      isCompleted: subTask.isCompleted || false,
    }))

    const indexColumn = currentBoard.columns.findIndex(
      (column) => column.id.toString() === columnId.toString()
    )
    if (task) {
      // editamos
      task.title = e.target.titleId.value
      task.description = e.target.descriptionId.value
      task.status = currentBoard.columns[indexColumn].name
      task.statusId = columnId
      task.subtasks = auxSubTasks
      editTask({ idOldColumn: columnRef.current, task })
    } else {
      const objAux = {
        id: generarId(),
        title: e.target.titleId.value,
        description: e.target.descriptionId.value,
        status: currentBoard.columns[indexColumn].name,
        statusId: columnId,
        subtasks: auxSubTasks,
      }

      createTask({ idBoard: currentBoard.id, indexColumn, task: objAux })
    }

    handleClose()
  }

  return (
    <section className={`${tablet.containerForm}`}>
      <form className={`${styles.newTask} ${tablet.newTask}`} onSubmit={handleSubmit}>
        {task ? <h2>edit task</h2> : <h2>add new task</h2>}

        <fieldset>
          <label htmlFor={titleId}>Title</label>
          <input
            type='text'
            id={titleId}
            name='titleId'
            defaultValue={task && task.title}
          />
        </fieldset>
        <fieldset>
          <label htmlFor={descriptionId}>Description</label>
          <textarea
            name='descriptionId'
            id={descriptionId}
            cols='30'
            rows='10'
            defaultValue={task && task.description}
          />
        </fieldset>
        <fieldset>
          <label htmlFor=''>Subtasks</label>
          {subTasks.map((subTask) => (
            <div key={subTask.id} className={styles.containerInput}>
              <input id={subTask.id} type='text' defaultValue={subTask.title} />

              <button type='button' onClick={() => handleDeleteRow(subTask.id)}>
                <CloseIcon />
              </button>
            </div>
          ))}
          <button
            type='button'
            onClick={handleNewRow}
            className={styles.whiteButton}
          >
            + Add New Subtask
          </button>
        </fieldset>
        <fieldset>
          <label htmlFor={statusSelectId}>Status</label>
          <select id={statusSelectId} name='statusSelectId'>
            {currentBoard.columns.map((column) => (
              <option
                key={column.id}
                value={column.id}
                selected={task?.statusId.toString() === column.id.toString()}
              >
                {column.name}
              </option>
            ))}
          </select>
        </fieldset>
        <button type='submit' className={styles.blueButton}>
          {task ? 'Save Changes' : 'Create Task'}
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
