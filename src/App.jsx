import ChatRoom from './components/ChatRoom';
import Login from './components/login'
import { Routes, Route } from "react-router";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />     
      <Route path="/" element={<ChatRoom />} /> 
    </Routes>
  )
}

export default App
