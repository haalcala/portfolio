import { useState } from 'react'
import { Link, Route, Router, Routes, Navigate } from 'react-router-dom'
import HealthForm from './components/HealthForm'
import HealthFormPreview from './components/HealthFormPreview'
import { useController } from './context/MyContextProvider'

function App() {

  const {state} = useController()

  return (
    <div className="App">
        <h2 className="title">Health Declaration Form</h2>
      <section>
        <Routes>
          <Route path="/" element={state.response_status ? <Navigate to="/preview"/> : <HealthForm/>}/>
          <Route path="/preview" element={state.name ? <HealthFormPreview/> : <Navigate to="/"/>}/>
        </Routes>
      </section>
    </div>
  )
}

export default App
