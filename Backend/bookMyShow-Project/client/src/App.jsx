import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './Components/ProtectedRoute';
import Admin from './pages/Admin';
import User from "./pages/User"
import Partner from './pages/Partner';
import StripeIntegration from './Components/StripeIntegration';

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/admin' element={<ProtectedRoute><Admin/></ProtectedRoute>}/>
        <Route path='/profile' element={<ProtectedRoute><User/></ProtectedRoute>}/>
        <Route path='/partner' element={<ProtectedRoute><Partner/></ProtectedRoute>}/>
        <Route path='/payment' element={<StripeIntegration/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
