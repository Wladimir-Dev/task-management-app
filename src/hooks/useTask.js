import { useState } from 'react'
import data from '../mocks/data.json'

export const useTask = () => {
  const [boards, setBoards] = useState([data.boards])

  return { boards, setBoards }
}
