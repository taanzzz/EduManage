import React from 'react'
import Partners from '../../components/Home/Partners'
import Stats from '../../components/Home/Stats'
import Feedback from '../../components/Home/Feedback'
import PopularClasses from '../../components/Home/PopularClasses'

const Home = () => {
  return (
    <div>
      <PopularClasses></PopularClasses>
      <Feedback></Feedback>
      <Partners></Partners>
      <Stats></Stats>
    </div>
  )
}

export default Home
