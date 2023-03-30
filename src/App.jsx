import './App.css'
import Header from './components/Header'
import { GroupTask } from './containers/GroupTask'

function App () {
  return (
    <main className='app'>
      <Header />
      <GroupTask />
    </main>
  )
}

export default App
