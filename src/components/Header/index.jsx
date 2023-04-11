import React, { useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ListOfBoards } from '../../containers/ListOfBoards'
import { FormBoard } from '../FormBoard'
import { FormTask } from '../FormTask'
import {
  AddTaskMobileIcon,
  ChevronDownIcon,
  LogoDarkIcon,
  LogoLightIcon,
  LogoMobileIcon,
  VerticalEllipsisIcon
} from '../Icons'

import { useBoard } from '../../hooks/useBoard'

import styles from './styles.module.css'
import tablet from './tablet.module.css'

export default function Header () {
  const [showEditBoard, setShowEditBoard] = useState(false)
  const [showNewTask, setShowNewTask] = useState(false)

  const { currentBoard, deleteBoard, modoLight } = useBoard()

  const boardsId = useId()
  const optionsId = useId()
  const refCheckBoards = useRef()
  const refCheckOptions = useRef()

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
    <header
      className={`
   ${modoLight && styles.onLight} ${styles.header} ${tablet.header}`}
    >
      <div className={tablet.headerLeft}>
        <figure>
          <LogoMobileIcon />
        </figure>
        <figure>{modoLight ? <LogoDarkIcon /> : <LogoLightIcon />}</figure>
      </div>
      <div className={`${styles.headerRigth} ${tablet.headerRigth}`}>
        <label className={`${styles.onlyBoardName} ${tablet.onlyBoardName}`}>
          {currentBoard.name}
        </label>
        <label
          htmlFor={boardsId}
          className={`${styles.boardName} ${tablet.boardName}`}
        >
          {currentBoard.name}
          <ChevronDownIcon />
        </label>
        <input ref={refCheckBoards} type='checkbox' id={boardsId} hidden />
        <div className={`${styles.containerBoards} ${tablet.containerBoards}`}>
          <ListOfBoards closeWindow={closeListBoards} />
        </div>
        <div
          className={`${styles.containerAddButton} ${tablet.containerAddButton}`}
        >
          <button
            type='button'
            className={`${styles.addButton} ${tablet.addButton}`}
            onClick={handleAddTask}
          >
            <AddTaskMobileIcon />
          </button>
          <label htmlFor={optionsId} className={styles.optionIcon}>
            <VerticalEllipsisIcon />
          </label>
          <input ref={refCheckOptions} type='checkbox' id={optionsId} hidden />
          <div className={`${modoLight && styles.onLight} ${styles.containerOptions}`}>
            <button type='button' onClick={handleEditBoard}>
              Edit Board
            </button>
            <button type='button' onClick={handleDeleteBoard}>
              Delete Board
            </button>
          </div>
        </div>
      </div>
      {showEditBoard &&
        createPortal(
          <FormBoard showWindow={setShowEditBoard} board={currentBoard} />,
          document.body
        )}
      {showNewTask &&
        createPortal(<FormTask showWindow={setShowNewTask} />, document.body)}
    </header>
  )
}
