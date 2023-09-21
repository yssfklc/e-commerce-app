import React from 'react';
import p4 from '../img/p4.png'

function Contact() {
  return (
    <div className='bg-gray-800 border-2 border-red-700 p-5 flex mb-10'>
        <div>
            <img src={p4} alt=''/>
        </div>
        <div>
        <h1 className='text-gray-100 text-6xl mb-10 font-bold'>Ready To Train <br/><span className='text-red-700'>Contact Us</span></h1>
        <p className='text-gray-100 mb-10 w-3/4'>Gym training is a structured and disciplined approach to physical exercise that focuses on strength, endurance and overall fitness improvement.</p>
        <form>
          
          <input className='border-2 border-gray-100 text-gray-100 bg-gray-800 w-1/3 rounded-lg py-3 px-2 mr-5 mb-10' placeholder='Enter Your Name...'/>
          <input className='border-2 border-gray-100 text-gray-100 bg-gray-800 w-1/3 rounded-lg py-3 px-2 mr-5 mb-10' placeholder='Enter Your Phone...'/>
          <input className='border-2 border-gray-100 text-gray-100 bg-gray-800 w-2/3 rounded-lg py-3 px-2 mr-5 mb-10' placeholder='Enter Your Email...'/>
          <br/>
          <br/>
          <button  className='text-red-600 border-2 border-red-600 text-xl py-3 px-10 rounded-lg text-center'>Be Strong </button>
          
        </form>
        </div>
    </div>
  )
}

export default Contact