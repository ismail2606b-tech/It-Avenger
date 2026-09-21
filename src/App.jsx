import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Home from './Home'
import Header from './componets/Header'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import About from './About'

function App() {

  return (
    <>
<BrowserRouter>
<Header/>
<Routes>

    <Route path="/" element={<Home/>}></Route>
     <Route path="/about" element={<About/>}></Route>
</Routes>
</BrowserRouter>
    </>
  )
}


export default App
