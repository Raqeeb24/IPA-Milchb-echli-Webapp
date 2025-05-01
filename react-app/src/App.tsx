import ApiRequest from './api.requests'
import LoginView from './components/LoginView'
import { Route, Routes } from 'react-router-dom'
import { CustomerProvider } from './components/context/CustomerContext'
import HomeView from './components/HomeView'
import { LoginLayout } from './LoginLayout'
import { AppLayout } from './AppLayout'
import ReportView from './components/ReportView'
import "./components/print.css";

function App() {
  return (
    <>
      <CustomerProvider>
        <Routes>
          <Route element={<LoginLayout />}>
            <Route path="/" element={<LoginView />} />
          </Route>
          <Route element={<AppLayout />}>
            <Route path="/HomeView" element={<HomeView />} />
            <Route path="/ReportView" element={<ReportView />} />
          </Route>
        </Routes>
        <br />
        <button onClick={() => ApiRequest.getTestingData()}>Daten abrufen</button>
      </CustomerProvider>
    </>
  )
}

export default App
