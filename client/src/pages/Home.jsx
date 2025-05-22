import Navbar from "../components/Navbar.jsx";
import Hero from "../section/Hero.jsx";
import HowItWorks from "../section/HowItWorks.jsx";
import FeaturedCarCard from "../components/FeaturedCarCard.jsx";
import WhyChooseUs from "../section/WhyChooseUs.jsx";
import Testimonial from "../section/Testimonial.jsx";
import Footer from "../components/Footer.jsx";

function Home() {
  return (
    <div id="home">
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeaturedCarCard />
      <WhyChooseUs />
      <Testimonial />
      <Footer />
    </div>
  );
}

export default Home;
