import { useState, useRef, useEffect } from 'react'
import logo from '../assets/logo.png'
import { FaUser, FaUserShield } from "react-icons/fa6"
import { Link } from 'react-router-dom'

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='h-[10vh] w-full px-10 py-5'>
      <nav className='flex justify-between items-center h-full'>
        
        <Link className='flex items-center justify-center gap-2' to={'/'}>
          <img src={logo} alt="nav_logo" width="50px" />
          <p className="text-xl font-semibold">RideNow</p>
        </Link>

        <div className='w-[35%]'>
          <ul className='flex items-center justify-between text-sm font-medium text-gray-700'>
            <Link className="cursor-pointer hover:text-blue-600 transition" to={'/'}>Home</Link>
            <Link className="cursor-pointer hover:text-blue-600 transition" to={'/cars'}>Rental Deals</Link>
            <a href='#testimonials' className="cursor-pointer hover:text-blue-600 transition">Testimonials</a>
            <a href='#why-choose-us' className="cursor-pointer hover:text-blue-600 transition">Why Choose Us</a>
          </ul>
        </div>

        <div className='relative' ref={dropdownRef}>
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className='bg-blue-600 text-white px-4 py-2 rounded-full shadow-2xl hover:bg-blue-700 transition cursor-pointer'
            aria-haspopup="true"
            aria-expanded={showDropdown}
          >
            Book Now →
          </button>

          {showDropdown && (
            <div className='absolute right-0 top-full mt-2 w-44 bg-blue-600 text-white rounded shadow-lg z-50'>
              <Link 
                to="/login" 
                className='flex items-center gap-2 px-4 py-2 hover:bg-blue-700 transition hover:rounded w-full text-left'
              >
                <FaUser className='text-md'/>
                User Login
              </Link>
              <Link 
                to="/admin/login" 
                className='flex items-center gap-2 px-4 py-2 hover:bg-blue-700 transition hover:rounded w-full text-left'
              >
                <FaUserShield className='text-lg'/>
                Admin Login
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
