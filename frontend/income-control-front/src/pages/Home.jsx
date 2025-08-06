import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      {/* Hero Section */}
      <section className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-20 gap-10">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-6 text-[#CC0000]">Take Control of Your Finances</h2>
          <p className="text-lg mb-6 text-gray-700">
            Income Control helps you track your income, bills, debt, and savings all in one place.
            Stay on top of your financial goals with powerful budgeting tools.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition">
            Get Started
          </button>
        </div>
        <div className="md:w-1/2">
          {/* Replace with your image or animation */}
          <div className="bg-gray-200 w-full h-64 rounded-lg shadow-inner flex items-center justify-center text-gray-500">
            [ App Preview / Hero Image ]
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Home
