import car from '/6.png'
import { BiSupport, BiWallet } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { 
    MdOutlineVerified, 
    MdOutlineFreeCancellation, 
    MdOutlineAdminPanelSettings, 
} from "react-icons/md";
import Spline from '@splinetool/react-spline';


function WhyChooseUs() {
    const features = [
                    {
                        title: 'Customer Support',
                        description: 'Our dedicated support team is available to assist you 24/7.',
                        iconComponent: <BiSupport />
                    },
                    {
                        title: 'Many Locations',
                        description: 'Convenient pick-up and drop-off locations to suit your travel needs.',
                        iconComponent: <GrLocation />
                    },
                    {
                        title: 'Best Price',
                        description: 'Enjoy competitive rates and great value for every rental.',
                        iconComponent: <BiWallet />
                    },
                    {
                        title: 'Experience Driver',
                        description: 'Reliable, professional drivers available upon request.',
                        iconComponent: <MdOutlineAdminPanelSettings />
                    },
                    {
                        title: 'Verified Brands',
                        description: 'Choose from trusted and well-maintained car brands.',
                        iconComponent: <MdOutlineVerified />
                    },
                    {
                        title: 'Free Cancellations',
                        description: 'Flexible bookings with free cancellation options.',
                        iconComponent: <MdOutlineFreeCancellation />
                    },
    ]

  return (
    <div className='flex items-center justify-center py-10 bg-[#F3F3F3]' id='why-choose-us'>
        <div className='w-full lg:w-1/2 flex justify-center items-center'>
            <Spline 
                scene="https://prod.spline.design/zk25L52l3wP9Ft7N/scene.splinecode"
                className='w-full h-full'
            />
        </div>

        <div className=' w-[55%] h-full flex flex-col pr-10'>
            <div className='w-full h-full flex flex-col justify-center gap-5'>
                <h1 className='text-4xl font-bold'>Why Choose Us</h1>
                <p className='text-[#767268]'>Discover the difference with our car rental service. We offer reliable vehicles, exceptional customer service, and competitive pricing to ensure a seamless rental experience.</p>
            </div>

            <div className='h-full grid grid-cols-2 grid-rows-3'>
                {features.map((obj, index) => (
                        <div 
                            key={index}
                            className='mt-10 mr-10 flex items-center justify-center gap-5'
                        >
                            <div className='h-10 w-15 rounded-lg bg-[#e5e7ff] text-[#8A79F0] flex gap-5 items-center justify-center text-xl'>
                                {/* icon */}
                                {obj.iconComponent}
                            </div>
                            <div className='flex flex-col justify-center gap-2'>
                                {/* info */}
                                <h1 className='text-lg font-semibold'>{obj.title}</h1>
                                <p className='text-sm text-[#767268]'>{obj.description}</p>
                            </div>
                        </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default WhyChooseUs