import { useContext } from 'react'
import { BoardContext } from '../context/BoardContext'

export const useTask = () => {
  const { boards, setBoards, currentBoard, setCurrentBoard, modoLight, setModoLight } =
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
  const deleteBoard = () => {
    const auxBoards = boards.filter((board) => board.id != currentBoard.id)
    setCurrentBoard(auxBoards[0])
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
    const indexBoard = boards.findIndex(
      (oldBoard) => oldBoard.id === currentBoard.id
    )
    const indexColumn = boards[indexBoard].columns.findIndex(
      (column) => column.id.toString() === idColumn.toString()
    )
    return { indexBoard, indexColumn }
  }

  const searchIndexTask = (indexBoard, indexColumn, idTask) => {
    return boards[indexBoard].columns[indexColumn].tasks.findIndex(
      (Task) => Task.id.toString() === idTask.toString()
    )
  }
  const removeTask = (indexBoard, indexColumn, idTask) => {
    return boards[indexBoard].columns[indexColumn].tasks.filter(
      (Task) => Task.id.toString() !== idTask.toString()
    )
  }
  const updateColumn = (indexBoard, indexColumn, idTask, idNewColumn) => {
    const updatedTasks = removeTask(indexBoard, indexColumn, idTask)

    const indexNewColumn = boards[indexBoard].columns.findIndex(
      (column) => column.id.toString() === idNewColumn.toString()
    )
    return { updatedTasks, indexNewColumn }
  }
  const deleteTask = ({ task }) => {
    const auxBoards = [...boards]

    const { indexBoard, indexColumn } = searchColumn(task.statusId)
    const updatedTasks = removeTask(indexBoard, indexColumn, task.id)

    auxBoards[indexBoard].columns[indexColumn].tasks = updatedTasks
    setBoards(auxBoards)
  }
  const editTask = ({ idOldColumn, task }) => {
    const auxBoards = [...boards]

    const { indexBoard, indexColumn } = searchColumn(idOldColumn)

    if (idOldColumn.toString() !== task.statusId.toString()) {
      // muevo columna
      const { updatedTasks, indexNewColumn } = updateColumn(
        indexBoard,
        indexColumn,
        task.id,
        task.statusId
      )

      auxBoards[indexBoard].columns[indexColumn].tasks = updatedTasks
      auxBoards[indexBoard].columns[indexNewColumn].tasks.push(task)

      setBoards(auxBoards)
    } else {
      const indexTask = searchIndexTask(indexBoard, indexColumn, task.id)

      auxBoards[indexBoard].columns[indexColumn].tasks[indexTask] = task
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
    const { indexBoard, indexColumn } = searchColumn(idColumn)
    const auxBoards = [...boards]

    if (idNewColumn) {
      // mover todo el task a otra columna
      const { updatedTasks, indexNewColumn } = updateColumn(
        indexBoard,
        indexColumn,
        idTask,
        idNewColumn
      )
      auxBoards[indexBoard].columns[indexColumn].tasks = updatedTasks

      newTask.statusId = idNewColumn
      newTask.status = auxBoards[indexBoard].columns[indexNewColumn].name

      auxBoards[indexBoard].columns[indexNewColumn].tasks.push(newTask)
    } else {
      // actualizamos solo el substasks
      const indexTask = searchIndexTask(indexBoard, indexColumn, idTask)
      auxBoards[indexBoard].columns[indexColumn].tasks[indexTask].subtasks =
        subTasks
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
    deleteTask,
    deleteBoard,
    modoLight,
    setModoLight
  }
}
