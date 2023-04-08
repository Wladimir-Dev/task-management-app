import './App.css'
import { Body } from './components/Body'
import Header from './components/Header'
import { useBoard } from './hooks/useBoard'

function App () {
  const {modoLight}=useBoard()
  return (
    <main className={`app ${modoLight && `modoLight`}`}>
      <Header />
      <Body />
    </main>
  )
}

export default App
