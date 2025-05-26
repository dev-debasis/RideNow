import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function Car() {
  return (
    <div>
      <Navbar />
     <form action="" className='flex items-center m-10'>
      <input 
        type="text" 
        placeholder='Search..'
        className='border border-[#E5E7EB] px-2 py-2 w-full rounded-sm focus:outline-none'
      />
     </form>

     {/* Container div of filter and car listings*/}
     <div className='h-100 m-10 flex gap-3'>
      {/* filter and sorting options */}
      <div className='w-[15%] flex flex-col items-center justify-center gap-3'> 
        {/* category filter div*/}
        <div className='border border-[#DFDFDF] w-full h-full p-3'>
          <h1 className='mb-2'>Cars Categories</h1>
          {
            [
              'Suv', 'Sedan', 'Electric', 'Luxury', 'Sports'
            ].map((category, index) => (
              <div key={index} className='flex items-center gap-1 text-sm font-light'>
                <input type="checkbox" id='suv'/>
                <label htmlFor="suv">{category}</label>
              </div>
            ))
          }
        </div>

        {/* price filter div */}
        <div className='border border-[#DFDFDF] w-full h-full p-3'>
          <h1 className='mb-2'>Filter by price</h1>
          {
            [
              'Under $50', '$50 - $100', 'Over $100'
            ].map((category, index) => (
              <div key={index} className='flex items-center gap-1 text-sm font-light'>
                <input type="checkbox" id='suv'/>
                <label htmlFor="suv">{category}</label>
              </div>
            ))
          }
        </div>
        {/* sorting opt. div */}
        <div className='border border-[#DFDFDF] w-full h-full p-3'>
          <h1 className='mb-2'>Sort By Price</h1>
          {
            [
              'Price: Low to High', 'Price: High to Low'
            ].map((category, index) => (
              <div key={index} className='flex items-center gap-1 text-sm font-light'>
                <input type="checkbox" id='suv'/>
                <label htmlFor="suv">{category}</label>
              </div>
            ))
          }
        </div>
      </div>

      {/* Car listings */}
      <div className='border border-[#DFDFDF] w-[85%]'> Car listings </div>
     </div>
     <Footer />
    </div>
  )
}

export default Car
