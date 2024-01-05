
import { useDispatch } from 'react-redux';
import './App.css';
import { useEffect, useState } from 'react';
import authservice from './appwrite/Auth';
import { login, logout } from '../src/Store/AuthSlice'

function App() {

const[loading,setloading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
   debugger
    authservice.getCurrentUser().then((userdata) => {
      if (userdata) {
        dispatch(login({userdata}))
      }
      else {
        dispatch(logout())
      }
    }).finally(()=>{
      setloading(false)
    })
  }, [])

  return !loading ? (
    <>
    <h2>lorem</h2>
    </>
  ) : (
    <h1>deepak</h1>
  )
}

export default App;
