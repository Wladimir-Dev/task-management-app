import React, { useId } from 'react'
import { ListOfBoards } from '../../containers/ListOfBoards'
import {
  AddTaskMobileIcon,
  ChevronDownIcon,
  LogoMobileIcon,
  VerticalEllipsisIcon
} from '../Icons'

import styles from './styles.module.css'

export default function Header () {
  const boardsId = useId()
  const optionsId = useId()

  return (
    <header className={styles.header}>
      <figure>
        <LogoMobileIcon />
      </figure>
      <label htmlFor={boardsId} className={`${styles.boardName}`}>
        Platform Launch
        <ChevronDownIcon />
      </label>
      <input type='checkbox' id={boardsId} hidden />
      <div className={styles.containerBoards}>
        <ListOfBoards />
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
