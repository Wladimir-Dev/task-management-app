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

  const updateTask = ({
    idColumn,
    idTask,
    subTasks,
    idNewColumn = undefined,
    newTask
  }) => {
    const index = boards.findIndex(
      (oldBoard) => oldBoard.id === currentBoard.id
    )

    const indexColumn = boards[index].columns.findIndex(
      (column) => column.id == idColumn
    )
    const auxBoards = [...boards]
    if (idNewColumn) {
      // mover todo el task a otra columna
      auxBoards[index].columns[indexColumn].tasks = boards[index].columns[
        indexColumn
      ].tasks.filter((task) => task.id != idTask)

      const indexNewColumn = boards[index].columns.findIndex(
        (column) => column.id == idNewColumn
      )

      newTask.statusId = idNewColumn
      newTask.status = auxBoards[index].columns[indexNewColumn].name

      auxBoards[index].columns[indexNewColumn].tasks.push(newTask)
    } else {
      // actualizamos solo el task
      const indexTask = boards[index].columns[indexColumn].tasks.findIndex(
        (task) => task.id == idTask
      )
      auxBoards[index].columns[indexColumn].tasks[indexTask].subtasks = subTasks
    }
    setBoards(auxBoards)
  }
  return {
    boards,
    setBoards,
    currentBoard,
    setCurrentBoard,
    updateBoard,
    createBoard,
    createTask,
    updateTask
  }
}
