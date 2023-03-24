import React, { useState } from 'react'
import { BoardIcon, DarkLogoIcon, LightLogoIcon } from '../../components/Icons'
import { NewBoard } from '../../components/NewBoard'
import data from '../../mocks/data.json'
import styles from './styles.module.css'
export function ListOfBoards() {
  const boards = data.boards
  const [newBoard, setNewBoard] = useState(false)
  const handleNewBoard = () => {
    setNewBoard(true)
  }
  return (
    <div className={styles.listOfBoards}>
      <span>ALL BOARDS ({boards.length})</span>
      <ul>
        {boards.map((board) => (
          <li key={board.id}>
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
      {newBoard && <NewBoard />}
    </div>
  )
}
