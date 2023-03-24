import React, { useState } from 'react'
import { BoardIcon, DarkLogoIcon, LightLogoIcon } from '../../components/Icons'
import { NewBoard } from '../../components/NewBoard'
import { useTask } from '../../hooks/useTask'
import styles from './styles.module.css'
export function ListOfBoards ({ closeWindow }) {
  const { boards, setCurrentBoard, currentBoard } = useTask()
  const [showNewBoard, setShowNewBoard] = useState(false)

  const handleNewBoard = () => {
    setShowNewBoard(true)
  }
  const handleBoard = (boardName) => {
    setCurrentBoard(boardName)
    closeWindow()
  }
  return (
    <div className={styles.listOfBoards}>
      <span>ALL BOARDS ({boards.length})</span>
      <ul>
        {boards.map((board) => (
          <li
            key={board.id}
            onClick={() => handleBoard(board.name)}
            className={currentBoard === board.name && styles.boardActive}
          >
            <BoardIcon />
            {board.name}
          </li>
        ))}
        <li onClick={handleNewBoard}>
          <BoardIcon />+ Create New Board
        </li>
      </ul>
      <div className={styles.footer}>
        <DarkLogoIcon />
        <button type='button'>
          <span />
        </button>
        <LightLogoIcon />
      </div>
      {showNewBoard && <NewBoard showWindow={setShowNewBoard} />}
    </div>
  )
}
