import { useState } from 'react'
import ApiRequest from './api.requests'
import { Container } from '@mui/material'
import LoginView from './components/LoginView'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/Haupt-View" element={<div>Haupt-view</div>} />
        </Routes>
        <br />
        <button onClick={() => ApiRequest.getTestingData()}>Daten abrufen</button>
      </Container>
    </>
  )
}

export default App
