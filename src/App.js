import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Homepage/Home';
import Login from './pages/Login/Login'
import Player from './pages/Player/Player';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const navigate = useNavigate();

  useEffect(()=>{
    onAuthStateChanged(auth,async (user)=>{
      if(user){
        console.log("Logged In");
        navigate('/');
      }else{
        console.log("logged out");
        navigate('/login');
      }
    });
  },[])

  return (
    <div className="App">
      <ToastContainer theme='dark'/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/player/:id' element={<Player />}/>
      </Routes>
    </div>
  );
}

export default App;
