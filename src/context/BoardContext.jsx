import React, { createContext, useState } from 'react'
import data from '../mocks/data.json'

export const BoardContext = createContext()

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState(JSON.parse(window.localStorage.getItem('reactBoards')) || data.boards)
  const [currentBoard, setCurrentBoard] = useState(data.boards[0])
  const [modoLight, setModoLight] = useState(false)
  return (
    <BoardContext.Provider
      value={{ boards, setBoards, currentBoard, setCurrentBoard, modoLight, setModoLight}}
    >
      {children}
    </BoardContext.Provider>
  )
}
