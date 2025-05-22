import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { TiSocialFacebook } from "react-icons/ti";
import { GrLinkedinOption } from "react-icons/gr";
import { 
    BiLogoInstagram,
    BiLogoDiscordAlt
} from "react-icons/bi";
import { RiTwitterXFill } from "react-icons/ri";
import { FiGlobe } from "react-icons/fi";
import { 
    MdPhoneInTalk,
    MdLocationOn,
    MdOutgoingMail,
} from "react-icons/md";
import { CgScrollV } from "react-icons/cg";


function Footer() {
    const socialLinks = [
        {
            icon: <GrLinkedinOption />,
            url: 'https://linkedin.com/in/debasis-khamari-/'
        },
        {
            icon: <BiLogoDiscordAlt />,
            url: 'https://discordapp.com/users/debasis_khamari/'
        },
        {
            icon: <TiSocialFacebook />,
            url: 'https://www.facebook.com/DebasisKhamariOfficial/'
        },
        {
            icon: <RiTwitterXFill />,
            url: 'https://x.com/debasiskhamari7/'
        },
        {
            icon: <BiLogoInstagram />,
            url: 'https://www.instagram.com/whoisthis.deba/'
        },
        {
            icon: <FiGlobe />,
            url: 'https://debasis.site/'
        },
    ]
    const contacts = [
        {
            icon: <MdPhoneInTalk />,
            value: '+91 906490XX96'
        },
        {
            icon: <MdLocationOn />,
            value: 'Kolkata, India'
        },
        {
            icon: <MdOutgoingMail />,
            value: 'debasiskhamari7@gmail.com'
        },
    ]
  return (
    <div className='relative bg-[#2E2A40] h-100 flex flex-col justify-center items-center gap-10 pt-20'>
        {/* footer derails */}
        <div className='w-full h-full grid grid-cols-3 grid-rows-1 gap-5 pl-30'>
            {/* first grid*/}
            <div className='flex flex-col px-10 gap-3'>
                {/* branding in the first grid */}
                <div className='flex items-center gap-2 text-white'>
                    <Link className='flex items-center gap-2' to={'/'}>
                        <img src={logo} alt="nav_logo" width="60px" className=' invert object-center -mt-3'/>
                        <p className="text-xl font-semibold">RideNow</p>
                    </Link>
                </div>
                
                {/* description in the first grid */}
                <div className='h-full py-5 text-white text-sm text-left'>
                    <p className='max-w-[75%]'>
                        We're here to provide you with the best vehicles and a seamless rental experience. Stay connected for updates, special offers, and more. Drive with confidence!
                    </p>
                </div>

                {/* social links in the first grid*/}
                <div className='h-full flex items-center gap-2 text-xl -mt-5'>
                    {socialLinks.map((obj, index) => 
                    <Link key={index} className='w-8 h-8 rounded-full bg-white flex items-center justify-center' to={obj.url} target='_blank'>
                        {obj.icon}
                    </Link>)}
                </div>
            </div>

            {/* Second grid */}
            <div className='w-full h-full flex flex-col text-white gap-7'>
                <h1 className='font-semibold text-xl'>Our Services</h1>
                <div>
                    <ul className='flex flex-col gap-2 text-sm'>
                        <a href='#home'>Home</a>
                        <Link to={'/cars'}>Rental Deals</Link>
                        <a href='#how-it-works'>How It Works</a>
                        <a href='#why-choose-us'>Why Choose Us</a>
                        <a href='#testimonials'>Testimonials</a>
                    </ul>
                </div>
            </div>

            {/* Third grid */}
            <div className='w-full h-full flex flex-col text-white gap-7'>
                <h1 className='font-semibold text-xl'>Contacts</h1>
                <div>
                    <ul className='flex flex-col gap-2 text-sm'>
                        {contacts.map((obj, index) => (
                            <div key={index} className='flex items-center gap-5'>
                                <div className='w-8 h-8 bg-white rounded-full text-black flex items-center justify-center text-lg'>
                                    {obj.icon}
                                </div>
                                <div className='flex items-center justify-center'>
                                    {obj.value}
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>

        </div>

        {/* copyright div */}
        <div className='flex items-center justify-center w-full text-white text-sm pb-3'>
                <p>Copyright © 2025 Debasis Khamari. All rights reserved.</p>
        </div>

        <a href='#home' className='absolute bg-white w-10 h-10 rounded-full text-black flex items-center justify-center font-bold text-lg right-10 top-[50%]'>
            <CgScrollV />
        </a>
    </div>
  )
}

export default Footer