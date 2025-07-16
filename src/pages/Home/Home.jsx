import React from 'react'
import Partners from '../../components/Home/Partners'
import Stats from '../../components/Home/Stats'
import Feedback from '../../components/Home/Feedback'
import PopularClasses from '../../components/Home/PopularClasses'
import Banner from '../../components/Home/Banner'
import WhyChooseUs from '../../components/Home/WhyChooseUs'
import HowItWorks from '../../components/Home/HowItWorks'
import HeroSection from '../../components/Home/HeroSection'
import KnowledgeSection from '../../components/Home/KnowledgeSection'
import FeaturedInstructors from '../../components/Home/FeaturedInstructors'
import ChatLauncher from '../../components/Chatbot/ChatLauncher'

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <Banner></Banner>
      <Partners></Partners>
      <WhyChooseUs></WhyChooseUs>
      <PopularClasses></PopularClasses>
      <HowItWorks></HowItWorks>
      <Stats></Stats>
      <Feedback></Feedback>
      <FeaturedInstructors></FeaturedInstructors>
      <KnowledgeSection></KnowledgeSection>
      <ChatLauncher></ChatLauncher>
    </div>
  )
}

export default Home
