import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Advisor = () => {
  return (
    <div>
    <Header />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold text-red-700 mb-4">AI Advisor</h1>
      <p className="text-xl text-gray-700 mb-8">
        This feature is currently under development. Stay tuned for smart, AI-powered budgeting advice coming soon!
      </p>
    </div>
    <Footer />
    </div>
  )
}

export default Advisor