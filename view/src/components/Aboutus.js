import React from 'react'
const reasons=[['01', 'PERSONAL TRAINING', 'Our gyms offer personalized training sessions with certified personal trainers who create customized workout plans based on individual goals'], ['02', 'EQUIPMENT AND FACILITIES', 'Our gyms offer personalized training sessions with certified personal trainers who create customized workout plans based on individual goals'], ['03', 'NUTRITION COUNSELING', 'Our gyms offer personalized training sessions with certified personal trainers who create customized workout plans based on individual goals'], ['04', 'SPECIALITY PROGRAMS', 'Our gyms offer personalized training sessions with certified personal trainers who create customized workout plans based on individual goals']];

function Aboutus() {
  return (
    <div>
        <div className='bg-black col-start-2 col-span-10 row-start-2 row-span-1  max-h-screen'>
            <div className='flex flex-col items-center justify-center '>
              <h2 className='text-gray-100 text-6xl mb-10 font-bold'>WHY<span className='text-red-700'>CHOOSE US</span></h2>
              <p className='text-gray-100 mb-10 w-1/3 text-center'>Gym workouts offer a versatile and customisable experience, allowing everyone to set specific fitness goals.</p>
            </div>
            <div className='flex p-10 justify-center flex-wrap'>
              {reasons.map((reason)=>{
                return(
                  <div className='w-5/12 p-5 border-2 border-red-700 m-5'>
                    <p className='text-gray-100 text-xl mb-5 font-bold'>{reason[0]}</p>
                    <h3 className='text-red-700 font-bold text-xl pb-2'>{reason[1]}</h3>
                    <p className='text-gray-100'>{reason[2]}</p>
                  </div>
                )
              })}
              
            </div>
        </div>
    </div>
  )
}

export default Aboutus