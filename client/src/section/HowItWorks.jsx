import { FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { IoCarSportSharp } from "react-icons/io5";

function HowItWorks() {
  return (
    <section className="flex flex-col items-center justify-center gap-20 px-10 mt-20" id="how-it-works">
        <div className="w-full flex flex-col items-center justify-center gap-3 -mt-10">
          <h1 className="text-4xl font-bold">How it work</h1>
          <p className="text-md font-normal text-[#767268] max-w-[55%] mx-auto flex items-center justify-center text-center">
            Renting a car with us is simple! Choose your vehicle, pick your
            dates, and complete your booking. We'll handle the rest, ensuring a
            smooth start to your journey.
          </p>
        </div>
        <div className="w-full flex flex-col gap-10 lg:flex-row items-center justify-center">
          <div className="space-y-5">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-[#EEEBFD] flex items-center justify-center rounded-2xl py-4 px-4 flex-0">
                <FaLocationDot className="text-3xl text-[#8A79F0]" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <h1 className="text-lg font-semibold">Choose Location</h1>
              <p className="text-[#767268] text-sm text-center w-[70%]">
                Select from a variety of pick-up locations that best suit your
                needs, whether it's close to home, work, or airport.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-[#FFF2E8] flex items-center justify-center rounded-2xl py-4 px-4 flex-0">
                <SlCalender className="text-3xl text-[#FBA55B]" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <h1 className="text-lg font-semibold">Pick-up Date</h1>
              <p className="text-[#767268] text-sm text-center w-[70%]">
                Choose the exact date and time for your car pick-up, ensuring
                that your vehicle is ready when you need it.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-[#FDE9EA] flex items-center justify-center rounded-2xl py-4 px-4 flex-0">
                <IoCarSportSharp className="text-3xl text-[#EE6A6F]" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <h1 className="text-lg font-semibold">Book your Car</h1>
              <p className="text-[#767268] text-sm text-center w-[70%]">
                Complete your booking with just a few clicks, and we'll prepare
                your vehicle to ensure a hassle-free pick-up.
              </p>
            </div>
          </div>
        </div>
      </section>

    )
}

export default HowItWorks
 