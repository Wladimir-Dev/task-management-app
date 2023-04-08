import React, { useState, useId } from 'react'
import { createPortal } from 'react-dom'

import {
  BoardIcon,
  DarkLogoIcon,
  HideSidebarIcon,
  LightLogoIcon,
  ShowSidebarIcon,
} from '../../components/Icons'
import { FormBoard } from '../../components/FormBoard'

import { useBoard } from '../../hooks/useBoard'

import styles from './styles.module.css'
import tablet from './tablet.module.css'

export function ListOfBoards ({ closeWindow }) {
  const [showNewBoard, setShowNewBoard] = useState(false)
  
  const { boards, currentBoard, setCurrentBoard, modoLight, setModoLight } = useBoard()
  
  const showId = useId()
  const sliderId = useId()

  const handleNewBoard = () => {
    setShowNewBoard(true)
  }
  const handleBoard = (board) => {
    setCurrentBoard(board)
    closeWindow && closeWindow()
  }
  const handleprueba=()=>{
    setModoLight(prev=>!prev)
  }

  return (
    <section className={`${tablet.listOfBoards}`}>
      <label className={`${tablet.enlazador}`} />
      <input type='checkbox' name='' id={showId} hidden />
      <label
        htmlFor={showId}
        className={`${styles.showList} ${tablet.showList}`}
      >
        <ShowSidebarIcon />
      </label>
      <section className={`${styles.containerList} ${tablet.containerList}`}>
        <div>
          <span>ALL BOARDS ({boards.length})</span>
          <ul>
            {boards.map((board) => (
              <li
                key={board.id}
                onClick={() => handleBoard(board)}
                className={
                  currentBoard.name === board.name && styles.boardActive
                }
              >
                <BoardIcon />
                {board.name}
              </li>
            ))}
            <li onClick={handleNewBoard}>
              <BoardIcon />+ Create New Board
            </li>
          </ul>
        </div>
        <div className={`${styles.footer} ${tablet.footer}`}>
          <div className={styles.footerMode}>
            <DarkLogoIcon />
            <label className={styles.guia} hidden />
            <input type='checkbox' id= {sliderId} defaultChecked={modoLight} onClick={handleprueba} hidden/>
            <label htmlFor= {sliderId} className= {styles.containerSlider}>
              <span className={styles.sliderButton}/>
            </label>
            <LightLogoIcon />
          </div>
          <label
            htmlFor={showId}
            className={`${styles.hideList} ${tablet.hideList}`}
          >
            <HideSidebarIcon />
            Hide Sidebar
          </label>
        </div>
        {showNewBoard &&
          createPortal(
            <FormBoard showWindow={setShowNewBoard} />,
            document.body
          )}
      </section>
    </section>
  )
}
