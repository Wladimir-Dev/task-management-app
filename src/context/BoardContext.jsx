import React, { createContext, useState, useRef } from 'react'
import data from '../mocks/data.json'

export const BoardContext = createContext()

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState(data.boards)
  const [currentBoard, setCurrentBoard] = useState(data.boards[0])
  return (
    <BoardContext.Provider
      value={{ boards, setBoards, currentBoard, setCurrentBoard }}
    >
      {children}
    </BoardContext.Provider>
  )
}
