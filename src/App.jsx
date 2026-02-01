import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Container from './components/layout/Container'
import StudentsPage from './components/pages/StudentsPage.jsx'
import StudentDetailPage from './components/pages/StudentDetailPage.jsx'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Container />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/students/:id" element={<StudentDetailPage />} />
    </Routes>
  )
}

export default App