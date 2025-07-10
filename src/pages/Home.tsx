import { useState } from 'react'
import imageOfPikachu from '/pikachucrop.gif'
import './Home.css'

function Home() {

  return (
    <>

      <div>
        <a href="https://jeffreychang.org" target="_blank">
          <img src={imageOfPikachu} className="logo" alt="Pikachu gif" />
        </a>
      </div>
      <h1 className='title'>Welcome to My Collection of Games!</h1>


      <div>
        <a href="/games" className="exploreButton">
        <button className='exploreButtonText'>
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
