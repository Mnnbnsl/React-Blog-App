import React, {useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container } from './index'

export default function AuthLayout({children, authentication = true}) {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)
  const authStatus = useSelector(state => state.auth.status)

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
        navigate('/login')
    } else if (!authentication && authStatus !== authentication) {
        navigate('/')
    }
    setLoader(false)
  }, [authStatus, navigate, authentication])
  
  return loader ? (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Container>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </Container>
    </div>
  ) : (
    <>{children}</>
  )
}