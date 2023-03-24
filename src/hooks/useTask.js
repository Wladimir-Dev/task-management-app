import { useContext } from 'react'
import { BoardContext } from '../context/BoardContext'

export const useTask = () => {
  const { boards, setBoards, currentBoard, setCurrentBoard } = useContext(BoardContext)
  return { boards, setBoards, currentBoard, setCurrentBoard }
}
