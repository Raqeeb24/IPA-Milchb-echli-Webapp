import { useState } from 'react'
import ApiRequest from './api.requests'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Milchbüechli Webapp</h1>
      <button onClick={() => ApiRequest.getTestingData()}>Daten abrufen</button>
    </>
  )
}

export default App
