import { useContext } from 'react'
import { BoardContext } from '../context/BoardContext'

export const useTask = () => {
  const { boards, setBoards, currentBoard, setCurrentBoard } =
    useContext(BoardContext)

  const updateBoard = (idNewBoard, nameBoard, columnsBoard) => {
    const index = boards.findIndex((oldBoard) => oldBoard.id === idNewBoard)
    const auxBoards = [...boards]
    console.log(auxBoards[index])
    auxBoards[index].name = nameBoard
    auxBoards[index].columns = columnsBoard
    console.log(auxBoards[index])
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

  const searchColumn = (idColumn) => {
    const index = boards.findIndex(
      (oldBoard) => oldBoard.id === currentBoard.id
    )
    const indexColumn = boards[index].columns.findIndex(
      (column) => column.id.toString() === idColumn.toString()
    )
    return { index, indexColumn }
  }

  const searchIndexTask = (index, indexColumn, idTask) => {
    return boards[index].columns[indexColumn].tasks.findIndex(
      (Task) => Task.id.toString() === idTask.toString()
    )
  }

  const updateColumn = (index, indexColumn, idTask, idNewColumn) => {
    const updatedTasks = boards[index].columns[indexColumn].tasks.filter(
      (Task) => Task.id.toString() !== idTask.toString()
    )

    const indexNewColumn = boards[index].columns.findIndex(
      (column) => column.id.toString() === idNewColumn.toString()
    )
    return { updatedTasks, indexNewColumn }
  }

  const editTask = ({ idOldColumn, task }) => {
    const auxBoards = [...boards]

    const { index, indexColumn } = searchColumn(idOldColumn)

    if (idOldColumn.toString() !== task.statusId.toString()) {
      // muevo columna
      const { updatedTasks, indexNewColumn } = updateColumn(
        index,
        indexColumn,
        task.id,
        task.statusId
      )

      auxBoards[index].columns[indexColumn].tasks = updatedTasks
      auxBoards[index].columns[indexNewColumn].tasks.push(task)

      setBoards(auxBoards)
    } else {
      const indexTask = searchIndexTask(index, indexColumn, task.id)

      auxBoards[index].columns[indexColumn].tasks[indexTask] = task
      setBoards(auxBoards)
    }
  }

  const updateTask = ({
    idColumn,
    idTask,
    subTasks,
    idNewColumn = undefined,
    newTask,
  }) => {
    const { index, indexColumn } = searchColumn(idColumn)
    const auxBoards = [...boards]

    if (idNewColumn) {
      // mover todo el task a otra columna
      const { updatedTasks, indexNewColumn } = updateColumn(
        index,
        indexColumn,
        idTask,
        idNewColumn
      )
      auxBoards[index].columns[indexColumn].tasks = updatedTasks

      newTask.statusId = idNewColumn
      newTask.status = auxBoards[index].columns[indexNewColumn].name

      auxBoards[index].columns[indexNewColumn].tasks.push(newTask)
    } else {
      // actualizamos solo el substasks
      const indexTask = searchIndexTask(index, indexColumn, idTask)

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
    updateTask,
    editTask,
  }
}
