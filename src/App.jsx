
import { Route, Routes } from 'react-router-dom'
import './App.css'
import React from 'react'
import Center from './pages/Center'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Center/>}/>
      </Routes>
    </>
  )
}

export default App
