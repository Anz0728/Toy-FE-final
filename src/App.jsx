import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Feed from './pages/Feed'
import Buylog from './pages/Buylog'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* TODO: 팀원 담당 - 온보딩/로딩 화면 (화면 8번) */}
        {/* <Route path="/onboarding" element={<Onboarding />} /> */}
        <Route path="/feed" element={<Feed />} />
        <Route path="/buylog" element={<Buylog />} />
        {/* TODO: 팀원 담당 - AI 분석 결과 화면 (화면 9번) */}
        {/* <Route path="/ai-result" element={<AiResult />} /> */}
        {/* TODO: 팀원 담당 - 상품명 입력 화면 (화면 5번) */}
        {/* <Route path="/edit" element={<Edit />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App