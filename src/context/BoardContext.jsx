import React, { createContext, useState } from 'react'
import data from '../mocks/data.json'

export const BoardContext = createContext()

export const BoardProvider = ({ children }) => {
  const storageBoard=JSON.parse(window.localStorage.getItem('reactBoards'))
  const [boards, setBoards] = useState( storageBoard || data.boards)
  const [currentBoard, setCurrentBoard] = useState(storageBoard ? storageBoard[0] : data.boards[0])
  const [modoLight, setModoLight] = useState(false)

  const setAll=(data)=>{
    setBoards(data)
    window.localStorage.setItem('reactBoards',JSON.stringify(data))
  }
  return (
    <BoardContext.Provider
      value={{ boards, setBoards:setAll, currentBoard, setCurrentBoard, modoLight, setModoLight}}
    >
      {children}
    </BoardContext.Provider>
  )
}
