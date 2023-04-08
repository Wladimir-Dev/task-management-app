import { useContext } from 'react'
import { BoardContext } from '../context/BoardContext'
export const useBoard = () => {
  const { boards, setBoards, currentBoard, setCurrentBoard, modoLight, setModoLight } =
    useContext(BoardContext)

  const createBoard = (newBoard) => {
    const auxBoards = [...boards, newBoard]
    setBoards(auxBoards)
    window.localStorage.setItem('reactBoards',JSON.stringify(auxBoards))
  }
  const updateBoard = (idNewBoard, nameBoard, columnsBoard) => {
    const index = boards.findIndex((oldBoard) => oldBoard.id === idNewBoard)
    const auxBoards = [...boards]
    console.log(auxBoards[index])
    auxBoards[index].name = nameBoard
    auxBoards[index].columns = columnsBoard
    console.log(auxBoards[index])
    setBoards(auxBoards)
  }
  const deleteBoard = () => {
    const auxBoards = boards.filter((board) => board.id != currentBoard.id)
    setCurrentBoard(auxBoards[0])
    setBoards(auxBoards)
  }
  return { boards, currentBoard, setCurrentBoard, modoLight, setModoLight, createBoard, updateBoard, deleteBoard }
}