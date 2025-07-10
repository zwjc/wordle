import { motion } from "motion/react"
import imageOfPikachu from '/pikachucrop.gif'
import gifOfSnivy from '/snivy.gif'
import gifOfCyndaquil from '/cyndaquil.gif'
import './Home.css'


function Home() {

  return (
    <>

      <div>
        <a href="https://jeffreychang.org" target="_blank">
          <motion.img
            src={imageOfPikachu}
            className="pikachu"
            alt="Pikachu gif"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </a>
      </div>
      <motion.h1
        className='title'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Welcome to My Collection of Games!
      </motion.h1>


      <div>
        <a href="/games" className="exploreButton">
        <motion.button
          className='exploreButtonText'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.8 } }}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          Explore Games
        </motion.button>
        </a>
        </div>

      <div>
        <motion.img
          src={gifOfSnivy}
          className="snivy"
          alt="Snivy gif"
        />
      </div>

      <div>
        <motion.img
          src={gifOfCyndaquil}
          className="cyndaquil"
          alt="Cyndaquil gif"
        />
      </div>

    </>
  )
}

export default Home
