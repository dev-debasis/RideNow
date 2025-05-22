import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import reviews from '../data/Testimonials.js'


function Testimonial() {
    
  return (
    <div className='flex flex-col py-30 gap-25' id='testimonials'>
        <div className='h-full flex flex-col items-center justify-center gap-5'>
            <h1 className='text-4xl font-bold'>What people say about us?</h1>
            <p className='text-md text-[#767268] text-center max-w-[55%]'>Discover why our customers love renting with us! Read real reviews and testimonials to see how we deliver exceptional service.</p>
        </div>

        <div className='h-full grid grid-rows-1 grid-cols-3 gap-3 px-10 space-y-5'>
            {reviews.map(review => (
                <div
                    key={review.id}
                    className='h-full px-5  rounded-lg shadow-2xl flex flex-col gap-5 hover:scale-101 transform hover:shadow-3xl flex-1'
                >
                    {/* container div of img, title and ratings */}
                    <div className='flex items-center gap-3'>
                        {/* img container */}
                        <div className='h-12 w-12'>
                            <img src={review.image} alt={`Image of ${review.name}`} className='object-contain rounded-full' />
                        </div>
                        <div>
                            <h1 className='font-semibold text-lg'>{review.name}</h1>
                            <div className='flex items-center text-[#DAA520] text-lg'>
                                {[...Array((parseInt(review.rating) || 0))].map((_, index) => (
                                    <IoMdStar key={index}/>
                                ))}
                                {[...Array(5 - (parseInt(review.rating) || 0))].map((_, index) => (
                                    <IoMdStarOutline key={index}/>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <p className='text-[#767268] text-sm'>{review.comment}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Testimonial