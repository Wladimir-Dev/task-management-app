import React from 'react'
import { GroupTask } from '../../containers/GroupTask'
import { ListOfBoards } from '../../containers/ListOfBoards'

import styles from './styles.module.css'
import tablet from './tablet.module.css'

export const Body = () => {
  return (
    <section className={`${styles.body} ${tablet.body}`}>
      <ListOfBoards />
      <GroupTask />
    </section>
  )
}
