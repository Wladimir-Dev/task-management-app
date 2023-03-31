import React, { useId, useRef, useState } from 'react'
import { useTask } from '../../hooks/useTask'
import { CloseIcon, VerticalEllipsisIcon } from '../Icons'

import styles from './styles.module.css'
import { FormTask } from '../FormTask'

export const Task = ({ task, showWindow }) => {
  const selectId = useId()
  const optionsId = useId()
  const refCheckOptions = useRef()
  const { currentBoard, updateTask } = useTask()
  const currentSelect = useRef(task.statusId)
  const [showEdit, setShowEdit] = useState(false)

  const nCompleted = task.subtasks.filter((subTask) => subTask.isCompleted)
  const nSubtasks = task.subtasks.length

  const handleClose = () => {
    showWindow(false)
  }
  const handleSelect = (e) => {
    if (currentSelect.current.toString() === e.target.value.toString()) return

    currentSelect.current = e.target.value
    updateTask({
      idColumn: task.statusId,
      idTask: task.id,
      idNewColumn: e.target.value,
      newTask: task
    })
  }
  const handleCheck = (idInput) => {
    const inputRef = document.getElementById(idInput)
    const indexSubTask = task.subtasks.findIndex(
      (subtask) => subtask.title === idInput
    )
    task.subtasks[indexSubTask].isCompleted = inputRef.checked
    updateTask({
      idColumn: task.statusId,
      idTask: task.id,
      subTasks: task.subtasks
    })
  }

  const handleEditBoard = () => {
    setShowEdit(true)
  }

  return (
    <section className={styles.task}>
      <form>
        <div className={styles.header}>
          <h2>{task.title}</h2>
          <label htmlFor={optionsId} className={styles.optionIcon}>
            <VerticalEllipsisIcon />
          </label>
          <input ref={refCheckOptions} type='checkbox' id={optionsId} hidden />
          <div className={styles.containerOptions}>
            <button type='button' onClick={handleEditBoard}>
              Edit Task
            </button>
            <button type='button'>Delete Task</button>
          </div>
        </div>
        <p>{task.description === '' ? 'sin descripción' : task.description}</p>
        <fieldset>
          <legend>
            Substasks ({nCompleted.length} de {nSubtasks})
          </legend>
          <div className={styles.containerSubTasks}>
            {task.subtasks.map((subTask) => (
              <div key={subTask.title} className={styles.subTask}>
                <input
                  type='checkbox'
                  id={subTask.title}
                  defaultChecked={subTask.isCompleted}
                  onClick={() => handleCheck(subTask.title)}
                />
                <label htmlFor={subTask.title}>{subTask.title}</label>
              </div>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <label htmlFor={selectId} className={styles.status}>
            Current Status
          </label>
          <select id={selectId} name='selectId' onClick={handleSelect}>
            {currentBoard.columns.map((column) => (
              <option
                key={column.id}
                value={column.id}
                selected={column.id.toString() === task.statusId.toString()}
              >
                {column.name}
              </option>
            ))}
          </select>
        </fieldset>
      </form>
      <button
        type='button'
        className={styles.closeButton}
        onClick={handleClose}
      >
        <CloseIcon />
      </button>
      {showEdit && <FormTask showWindow={setShowEdit} task={task} />}
    </section>
  )
}