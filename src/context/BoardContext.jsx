import React, { createContext, useState } from 'react'
import data from '../mocks/data.json'

export const BoardContext = createContext()

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState(data.boards)
  return (
    <BoardContext.Provider value={{ boards, setBoards }}>
      {children}
    </BoardContext.Provider>
  )
}
