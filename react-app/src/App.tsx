import { useState } from 'react'
import ApiRequest from './api.requests'
import { Container } from '@mui/material'
import LoginView from './components/LoginView'

function App() {
  return (
    <>
      <Container maxWidth="lg">
        <LoginView />
        <br />
        <button onClick={() => ApiRequest.getTestingData()}>Daten abrufen</button>
      </Container>
    </>
  )
}

export default App
