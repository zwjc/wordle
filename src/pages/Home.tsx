import { useState } from 'react'
import imageOfJeffrey from '/i.jpg'
import './Home.css'
import Wordle from './Wordle'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

function Home() {

  return (
    <>

      <div>
        <a href="https://jeffreychang.org" target="_blank">
          <img src={imageOfJeffrey} className="logo" alt="Jeffrey's website" />
        </a>
      </div>
      <h1>Welcome to My Collection of Games!</h1>


      <div>
        <a href="/games" className="exploreButton">
        <button>
          Explore Games
        </button>
        </a>
        </div>

        <div>
        <p>
          There is everything from fun challenges, to Wordle to quiz games!
        </p>
      </div>


    </>
  )
}

export default Home
