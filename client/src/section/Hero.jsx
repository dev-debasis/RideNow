import mercedes from '../assets/hero.mercedes.png'
import { VscVerifiedFilled } from "react-icons/vsc";


function Hero() {
  return (
    <>
      <div className="min-h-[calc(100vh-20vh)] w-full grid grid-cols-2">
        <div className="h-full flex flex-col justify-center px-10 bg-gradient-to-b from-[#FDFDFF] via-[#F9F9FE] to-[#F5F3FD]">
          <div className='my-5'>
              <p className='px-5 py-2 bg-white rounded-full w-fit flex items-center justify-center text-[#8A79F0] text-sm font-semibold shadow-lg gap-2 border border-cyan-300'>
                <VscVerifiedFilled className='text-lg'/>
                 100% Trusted car rental platform in India
              </p>
          </div>
          <div className='my-3'>
              <h1 className='text-5xl font-extrabold leading-tight'>FAST AND EASY WAY <br />TO RENT A CAR</h1>
          </div>
          <div className='my-2'>
              <p className='text-[#7D796F] font-normal text-md'>Discover a seamless car rental experience with us. Choose from a range of premium vehicles to suit your style and needs, and hit the road with confidence. Quick, easy, and reliable - rent your ride today!
              </p>
          </div>
        </div>
        <div className=" h-full flex items-end justify-center">
          <div className=' bg-[#E5E1FC] h-[80%] w-full rounded-tl-4xl'>
            <img src={mercedes} alt=""/>
          </div>
        </div>
      </div>
      <div className='relative z-100 h-[15vh] flex items-center justify-center bg-transparent'>
        <div className='absolute h-full w-[80%] rounded-2xl shadow-2xl bg-white bottom-12 flex flex-col md:flex-row items-center justify-between'>
          {[
              {value: '500+', label: 'Cars Available'},
              {value: '1000+', label: 'Happy Customers'},
              {value: '50+', label: 'Locations'},
              {value: '24/7', label:'Support'}
          ].map((stat, index) => (
            <div key={index} className='text-center flex-1'>
                <div className='text-3xl font-bold mb-2'>{stat.value}</div>
                <div className='text-[#7D796F]'>{stat.label}</div>
              </div>
          ))}
        </div>
      </div> 
    </>
  );
}

export default Hero;
