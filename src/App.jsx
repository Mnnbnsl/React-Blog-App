import { useState, useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((data) => {
      if (data) {
        dispatch(login(data))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-col bg-gray-50'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null
}

export default App