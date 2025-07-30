import React from 'react'
import Navbar from '../components/Navbar'
import Hero from './Hero'
import Contact from './Contact'
import Gallery from './Gallery'
import About from './About'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <About/>
        <Contact/>
        <Gallery/>

    </div>
  )
}

export default Home