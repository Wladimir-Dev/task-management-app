import React, { useId, useRef, useState } from 'react'
import { ListOfBoards } from '../../containers/ListOfBoards'
import { useTask } from '../../hooks/useTask'
import { FormBoard } from '../FormBoard'
import { FormTask } from '../FormTask'
import {
  AddTaskMobileIcon,
  ChevronDownIcon,
  LogoMobileIcon,
  VerticalEllipsisIcon,
} from '../Icons'

import styles from './styles.module.css'

export default function Header() {
  const { currentBoard, deleteBoard } = useTask()
  const boardsId = useId()
  const optionsId = useId()
  const refCheckBoards = useRef()
  const refCheckOptions = useRef()
  const [showEditBoard, setShowEditBoard] = useState(false)
  const [showNewTask, setShowNewTask] = useState(false)

  const closeListBoards = () => {
    refCheckBoards.current.checked = false
  }
  const handleEditBoard = () => {
    setShowEditBoard(true)
    refCheckOptions.current.checked = false
  }
  const handleAddTask = () => {
    setShowNewTask(true)
  }
  const handleDeleteBoard = () => {
    deleteBoard()
    refCheckOptions.current.checked = false
  }
  return (
    <header className={styles.header}>
      <figure>
        <LogoMobileIcon />
      </figure>
      <label htmlFor={boardsId} className={`${styles.boardName}`}>
        {currentBoard.name}
        <ChevronDownIcon />
      </label>
      <input ref={refCheckBoards} type='checkbox' id={boardsId} hidden />
      <div className={styles.containerBoards}>
        <ListOfBoards closeWindow={closeListBoards} />
      </div>
      <button
        type='button'
        className={styles.addButton}
        onClick={handleAddTask}
      >
        <AddTaskMobileIcon />
      </button>
      <label htmlFor={optionsId} className={styles.optionIcon}>
        <VerticalEllipsisIcon />
      </label>
      <input ref={refCheckOptions} type='checkbox' id={optionsId} hidden />
      <div className={styles.containerOptions}>
        <button type='button' onClick={handleEditBoard}>
          Edit Board
        </button>
        <button type='button' onClick={handleDeleteBoard}>
          Delete Board
        </button>
      </div>
      {showEditBoard && (
        <FormBoard showWindow={setShowEditBoard} board={currentBoard} />
      )}
      {showNewTask && <FormTask showWindow={setShowNewTask} />}
    </header>
  )
}
