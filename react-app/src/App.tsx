import ApiRequest from './api.requests'
import LoginView from './components/LoginView'
import { Route, Routes } from 'react-router-dom'
import { CustomerContext } from './components/context/CustomerContext'
import { emptyCustomer } from './components/interfaces/Customer'
import HomeView from './components/HomeView'
import { LoginLayout } from './LoginLayout'
import { AppLayout } from './AppLayout'

function App() {
  return (
    <>
      <CustomerContext.Provider value={{ customer: emptyCustomer, setCustomer: () => { } }}>
        <Routes>
          <Route element={<LoginLayout />}>
            <Route path="/" element={<LoginView />} />
          </Route>
          <Route element={<AppLayout />}>
            <Route path="/HomeView" element={<HomeView />} />
            <Route path="/ReportView" element={<div>ReportView</div>} />
          </Route>
        </Routes>
        <br />
        <button onClick={() => ApiRequest.getTestingData()}>Daten abrufen</button>
      </CustomerContext.Provider>
    </>
  )
}

export default App
