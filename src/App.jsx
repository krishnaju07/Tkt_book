import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from '../src/components/login'
import SeatBooking from '../src/components/seatBooking/'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { SpeedInsights } from "@vercel/speed-insights/next"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path:'/seatbooking',
    element:<SeatBooking/>
  }
]);

function App() {

  return (
    <>
    <div>
      <SpeedInsights/>
    <RouterProvider router={router} />
    </div>
    </>
  )
}

export default App
