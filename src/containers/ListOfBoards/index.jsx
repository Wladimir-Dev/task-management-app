import React, { useState, useId, useRef } from 'react'
import {
  BoardIcon,
  DarkLogoIcon,
  HideSidebarIcon,
  LightLogoIcon,
  ShowSidebarIcon,
} from '../../components/Icons'
import { FormBoard } from '../../components/FormBoard'
import { useTask } from '../../hooks/useTask'

import styles from './styles.module.css'
import tablet from './tablet.module.css'
import { createPortal } from 'react-dom'

export function ListOfBoards ({ closeWindow }) {
  const { boards, currentBoard, setCurrentBoard } = useTask()
  const [showNewBoard, setShowNewBoard] = useState(false)
  const showId = useId()
  const checkRef = useRef(false)

  const handleNewBoard = () => {
    setShowNewBoard(true)
  }
  const handleBoard = (board) => {
    setCurrentBoard(board)
    closeWindow()
  }
  console.log(checkRef.current.checked)
  return (
    <section className={`${tablet.listOfBoards}`}>
      <label className={`${tablet.enlazador}`} />
      <input type='checkbox' name='' id={showId} hidden ref={checkRef} />
      <label
        htmlFor={showId}
        className={`${styles.showList} ${tablet.showList}`}
      >
        <ShowSidebarIcon />
      </label>
      <section className={`${styles.containerList} ${tablet.containerList}`}>
        <div>
          <span>ALL BOARDS ({boards.length})</span>
          <ul>
            {boards.map((board) => (
              <li
                key={board.id}
                onClick={() => handleBoard(board)}
                className={
                  currentBoard.name === board.name && styles.boardActive
                }
              >
                <BoardIcon />
                {board.name}
              </li>
            ))}
            <li onClick={handleNewBoard}>
              <BoardIcon />+ Create New Board
            </li>
          </ul>
        </div>
        <div className={`${styles.footer} ${tablet.footer}`}>
          <div className={styles.footerMode}>
            <DarkLogoIcon />
            <button type='button'>
              <span />
            </button>
            <LightLogoIcon />
          </div>
          <label
            htmlFor={showId}
            className={`${styles.hideList} ${tablet.hideList}`}
          >
            <HideSidebarIcon />
            Hide Sidebar
          </label>
        </div>
        {showNewBoard &&
          createPortal(
            <FormBoard showWindow={setShowNewBoard} />,
            document.body
          )}
      </section>
    </section>
  )
}
