import { useContext } from 'react'
import { BoardContext } from '../context/BoardContext'

export const useTask = () => {
  const { boards, setBoards, currentBoard, setCurrentBoard } =
    useContext(BoardContext)

  const updateBoard = ({ idNewBoard, nameBoard, columnsBoard }) => {
    const index = boards.findIndex((oldBoard) => oldBoard.id === idNewBoard)
    const auxBoards = [...boards]
    auxBoards[index].name = nameBoard
    auxBoards[index].columns = columnsBoard
    setBoards(auxBoards)
  }
  const createBoard = (newBoard) => {
    const auxBoards = [...boards, newBoard]
    setBoards(auxBoards)
  }
  const createTask = ({ idBoard, indexColumn, task }) => {
    const index = boards.findIndex((oldBoard) => oldBoard.id === idBoard)
    const auxBoards = [...boards]
    auxBoards[index].columns[indexColumn].tasks.push(task)
    setBoards(auxBoards)
  }
  return {
    boards,
    setBoards,
    currentBoard,
    setCurrentBoard,
    updateBoard,
    createBoard,
    createTask
  }
}
