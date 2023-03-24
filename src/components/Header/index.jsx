import React, { useId, useRef } from 'react'
import { ListOfBoards } from '../../containers/ListOfBoards'
import { useTask } from '../../hooks/useTask'
import {
  AddTaskMobileIcon,
  ChevronDownIcon,
  LogoMobileIcon,
  VerticalEllipsisIcon
} from '../Icons'

import styles from './styles.module.css'

export default function Header () {
  const { currentBoard } = useTask()
  const boardsId = useId()
  const optionsId = useId()
  const refCheckBoards = useRef()

  const closeListBoards = () => {
    refCheckBoards.current.checked = false
  }
  return (
    <header className={styles.header}>
      <figure>
        <LogoMobileIcon />
      </figure>
      <label htmlFor={boardsId} className={`${styles.boardName}`}>
        {currentBoard}
        <ChevronDownIcon />
      </label>
      <input ref={refCheckBoards} type='checkbox' id={boardsId} hidden />
      <div className={styles.containerBoards}>
        <ListOfBoards closeWindow={closeListBoards} />
      </div>
      <button type='button' className={styles.addButton}>
        <AddTaskMobileIcon />
      </button>
      <label htmlFor={optionsId}>
        <VerticalEllipsisIcon />
      </label>
      <input type='checkbox' id={optionsId} hidden />
      <div className={styles.containerOptions}>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </header>
  )
}
