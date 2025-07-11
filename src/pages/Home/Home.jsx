import React from 'react'
import Partners from '../../components/Home/Partners'
import Stats from '../../components/Home/Stats'
import Feedback from '../../components/Home/Feedback'
import PopularClasses from '../../components/Home/PopularClasses'
import Banner from '../../components/Home/Banner'

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularClasses></PopularClasses>
      <Feedback></Feedback>
      <Partners></Partners>
      <Stats></Stats>
    </div>
  )
}

export default Home
