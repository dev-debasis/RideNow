import Navbar from "../components/Navbar.jsx";
import Hero from "../section/Hero.jsx";
import HowItWorks from "../section/HowItWorks.jsx";
import FeaturedCarCard from "../components/FeaturedCarCard.jsx";
import WhyChooseUs from "../section/WhyChooseUs.jsx";
import Testimonial from "../section/Testimonial.jsx";
import Footer from "../components/Footer.jsx";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Chatbot from '../components/Chatbot.jsx'
function Home() {
  const location = useLocation()
  useEffect(() => {
    const sectionId = location.state?.scrollTo
    if(sectionId){
      const element = document.getElementById(sectionId)
      if(element){
        element.scrollIntoView({behavior: 'smooth'})
      }
    }
  }, [location])

  return (
    <div id="home">
      <Navbar />
      <Hero />
      <Chatbot />
      <HowItWorks />
      <FeaturedCarCard />
      <WhyChooseUs />
      <Testimonial />
      <Footer />
    </div>
  );
}

export default Home;
