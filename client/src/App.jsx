import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Car from './pages/Car.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes className='bg-[#FFFFFF] min-h-screen'> 
          <Route path='/' element={<Home />}/>
          <Route path='/cars' element={<Car />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App