import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<h1>Errore 404</h1>} />
    </Routes>
  )
}

export default App
