import './App.css'
import Header from './components/Header'
import { BoardProvider } from './context/BoardContext'

function App () {
  return (
    <BoardProvider>
      <main className='app'>
        <Header />
      </main>
    </BoardProvider>
  )
}

export default App
