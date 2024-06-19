import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/jsx/HomePage.jsx'
import Board from './components/jsx/Board.jsx'


function App() {
  
  return (
    <Router>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/boards/:boardId" element={<Board />} />
      </Routes>
      
    </Router>
  )
}

export default App
