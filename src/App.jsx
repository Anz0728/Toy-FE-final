import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Feed from './pages/Feed'
import Buylog from './pages/Buylog'
import Login from './pages/Login'
import Home from './pages/Home'
import Analyze from './pages/Analyze'
import Result from './pages/Result'
import Report from './pages/Report'
import BottomNavBar from './components/BottomNavBar'
import './App.css'

function Layout() {
  const location = useLocation()
  const hideNav = location.pathname === '/'

  return (
    <div className="app-layout">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/buylog" element={<Buylog />} />
        <Route path="/home" element={<Home />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/result" element={<Result />} />
        <Route path="/report" element={<Report />} />
      </Routes>
      {!hideNav && <BottomNavBar />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App