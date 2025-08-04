import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
