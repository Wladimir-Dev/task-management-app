import { useContext } from 'react'
import { BoardContext } from '../context/BoardContext'

export const useTask = () => {
  const { boards, setBoards } = useContext(BoardContext)
  return { boards, setBoards }
}
