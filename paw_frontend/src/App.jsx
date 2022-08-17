import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import MapContainer from './components/MapContainer';
import NavBar from './components/NavBar';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios'
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import DashboardPage from './pages/DashboardPage'
import './App.css'
import AddPet from './pages/AddPet';
import AddBase from './pages/AddBase'
import ConnectPal from './pages/ConnectPal';
import ProviderPage from './pages/ProviderPage';
import ChatPage from './pages/ChatPage';
import ScheduleWalk from './pages/ScheduleWalk';
import WalkPage from './pages/WalkPage';
import WalkDetail from './pages/WalkDetail';
import PetDetail from './pages/PetDetail';
import PetEdit from './pages/PetEdit';
import ProfilePage from './pages/ProfilePage';
import EditProfile from './pages/EditProfile';

const getCSRFToken = () => {
  let csrfToken

  // the browser's cookies for this page are all in one string, separated by semi-colons
  const cookies = document.cookie.split(';')
  for (let cookie of cookies) {
    // individual cookies have their key and value separated by an equal sign
    const crumbs = cookie.split('=')
    if (crumbs[0].trim() === 'csrftoken') {
      csrfToken = crumbs[1]
    }
  }
  return csrfToken
}
axios.defaults.headers.common['X-CSRFToken'] = getCSRFToken()

function App() {
  const [user, setUser] = useState(null)
  const [isProvider, setIsProvider] = useState(null)
  const [pets, setPets] = useState(null)
  const [bases, setBases] = useState(null)



  const checkPets = async () => {
    const response = await axios.get('/checkpets')
    let petArray = []
    if (response.data != 'failure') {
      for (let i = 0; i < response.data.length; i++) {
        let newPet = response.data[i].fields
        newPet["id"] = response.data[i].pk
        petArray.push(newPet)
      }
    }
    else {
      petArray = null
    }
    setPets(petArray)
  }

  const checkBases = async () => {
    const response = await axios.get('/checkbases')
    let baseArray = []
    if (response.data != 'failure') {
      for (let i = 0; i < response.data.length; i++) {
        baseArray.push(response.data[i].fields.name)
      }
    }
    else {
      baseArray = null
    }
    setBases(baseArray)
  }

  const setProvider = (value) => {
    setIsProvider(value)
  }

  const checkUser = async () => {
    const response = await axios.get('/checkuser')
    let user = response.data && response.data[0] && response.data[0].fields
    let id = response.data && response.data[0] && response.data[0].pk
    if (user) {
      user.id = id
    }
    console.log('user? ', user)
    setUser(user)
    user && setIsProvider(user['is_provider'])
    return user
  }

  const getUserById = async (userId) => {
    const response = await axios.get(`/user/${userId}`)
    const user = response.data && response.data[0] && response.data[0].fields
    return user
  }


  useEffect(() => {
    checkUser().then(
      checkPets()).then(checkBases())
  }, [])



  return (
    <div className='bg'>
      <Router>
        <NavBar user={user} checkUser={checkUser} />
        <Routes>
          <Route path='/' element={<DashboardPage user={user} isProvider={isProvider} pets={pets} bases={bases} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login checkUser={checkUser} setProvider={setProvider} />} />
          <Route path='/addpet' element={<AddPet user={user} />} />
          <Route path='/addbase' element={<AddBase user={user} />} />
          <Route path='/connectpal' element={<ConnectPal user={user} />} />
          <Route path='/providers/:userID' element={<ProviderPage getUserById={getUserById} />} />
          <Route path='/chat/:walkerID' element={<ChatPage getUser={checkUser} getUserById={getUserById} />} />
          <Route path='/schedulewalk' element={<ScheduleWalk getUser={checkUser} pets={pets} getUserById={getUserById} />} />
          <Route path='/walk/:walkID' element={<WalkPage user={user} />} />
          <Route path='/walk/:walkID/view' element={<WalkDetail />} />
          <Route path='/pet/:petID/view' element={<PetDetail />} />
          <Route path='/pet/:petID/edit' element={<PetEdit />} />
          <Route path='/user/:userID/view' element={<ProfilePage user={user}/>} />
          <Route path='/user/:userID/edit' element={<EditProfile user={user}/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;