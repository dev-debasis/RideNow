import FeaturedCars from "../data/FeaturedCars.js";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { BsPeople } from "react-icons/bs";
import { RiSteering2Line } from "react-icons/ri";
import { MdSpeed } from "react-icons/md";
import { IoCarSportSharp } from "react-icons/io5";
import { Link } from 'react-router-dom'

function FeaturedCarCard() {
  return (
    <section className="bg-[#F1F2FF] mt-20 flex flex-col items-center justify-center pb-20">
        <div className="w-full flex flex-col items-center justify-center gap-3 pt-20">
          <h1 className="text-4xl font-bold">Featured Cars</h1>
          <p className="text-md font-normal text-[#767268] max-w-[55%] mx-auto text-center">
            Explore our top car rental deals, handpicked to give you the best
            value and experience. Book now and drive your favorite ride at an
            incredible rate!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-[95%] mx-auto mt-10 px-10">
          {FeaturedCars.map((car) => (
            <div
              key={car.id}
              className="w-full bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden transition transform hover:scale-105 duration-300 hover:shadow-4xl"
            >
              <div className="w-full aspect-[4/3]">
                <img
                  src={car.image}
                  alt={`Image of ${car.title}`}
                  className="w-full h-full object-contain"
                />
              </div>


              <div className="p-4 flex-1 flex flex-col justify-between">
                {/* Reviews/Ratings and title*/}
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(parseInt(car.review.ratings || 0))].map( (_, index) => (
                        <IoMdStar  key={index} className="text-xl text-[#DAA520]"/>
                    ))}
                    {[...Array((5 - (parseInt(car.review.ratings) || 0)))].map( (_, index) => (
                        <IoMdStarOutline key={index} className="text-xl text-[#DAA520]"/>
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      ({car.review.reviewerNumber})
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold">{car.title}</h2>
                </div>

                {/* Car features */}
                <div className="flex items-center justify-between mt-5 mr-10">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span><BsPeople className="text-gray-500"/></span>
                            <p className="text-sm text-gray-500">{car.seats}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <span><RiSteering2Line className="text-gray-500"/></span>
                            <p className="text-sm text-gray-500">{car.transmission}</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span><MdSpeed  className="text-gray-500"/></span>
                            <p className="text-sm text-gray-500">{car.speed}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <span><IoCarSportSharp className="text-gray-500"/></span>
                            <p className="text-sm text-gray-500">{car.fuelType}</p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-500 mt-5 flex items-center justify-between pt-5">
                  <p className="text-sm text-gray-500"><span className="font-bold text-black text-lg">{car.price}</span>/Per Day</p>

                  <Link 
                    className="border border-cyan-500 rounded-full px-5 py-2 bg-[#8A79F1] text-white hover:bg-white hover:text-[#8A79F1] transition transform hover:scale-105 duration-300"
                    to={'/cars'}
                  >
                    Rent Now →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
  )
}

export default FeaturedCarCard