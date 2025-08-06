import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-black text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-[#CC0000]">Income Control</h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:text-[#CC0000]">Home</Link>
        <Link to="/budget" className="hover:text-[#CC0000]">My Budget</Link>
        <Link to="/advisor" className="hover:text-[#CC0000]">AI Advisor</Link>
        <Link to="/account" className="hover:text-[#CC0000]">Account</Link>
      </nav>
    </header>

  )
}

export default Header