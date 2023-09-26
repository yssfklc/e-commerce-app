import React, { useEffect, useState } from 'react';
import p1 from '../img/p1.png';
import p2 from '../img/p2.png';
import p3 from '../img/p3.png';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../features/addBasketSlice';
import {getUser} from '../requests/requests';
import Rating from '@mui/material/Rating';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import Productcard from '../components/Productcard';
import Aboutus from '../components/Aboutus';


function Home() {
  const [products, setProducts]=useState([]);
  const dispatch = useDispatch();
  const remove={
    isempty:false,
    isRemove:false
  };


  const getOrder = async()=>{
    try{
      const response = await fetch('/api/products')
      if(response.ok){
        const result = await response.json();
        setProducts(result);
      }
    }catch(error){
      console.log(error);
    }
     
  };
  // getUser();
  // queries ends
  
  
  useEffect( ()=>{
     getOrder();
    //  getUser();
  }, [])
  
  return (
    <div className=' grid grid-cols-12 grid-rows-5 gap-5'>
          <div className=' col-start-1 col-span-12 row-start-1 row-span-1 max-h-screen'>
            <img src={p1} className=' w-screen h-screen object-cover'/>
          </div>
          <div className='bg-gray-800/50 col-start-1 col-span-12 row-start-1 row-span-1  max-h-screen'>   
          </div>
          <div className=' col-start-3 col-span-5 row-start-1 row-span-1 flex items-center  max-h-screen'>
            <div className=''>
              <h1 className='text-gray-100 text-6xl mb-10 font-bold'>Ready To Train <br/><span className='text-red-400'>Your Body</span></h1>
              <p className='text-gray-100 mb-10 w-3/4'>Gym training is a structured and disciplined approach to physical exercise that focuses on strength, endurance and overall fitness improvement.</p>
              <Link to='/register' className='bg-red-400 text-gray-100 mr-5 py-3 px-10 rounded-lg text-center'>Start Now</Link>
              <div className='flex mt-10 '>
                <div className='border-r-2 pr-8'>
                  <p className='text-4xl text-red-700 pb-3'>20+</p>
                  <p className='text-md text-gray-100'>Years Of Experience</p>
                </div>
                <div className='border-r-2 px-8'>
                  <p className='text-4xl text-red-700 pb-3'>15K+</p>
                  <p className='text-md text-gray-100'>Members Join</p>
                </div>
                <div className=' px-8'>
                  <p className='text-4xl text-red-700 pb-3'>14+</p>
                  <p className='text-md text-gray-100'>Happy Members</p>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-black col-start-2 col-span-10 row-start-2 row-span-1  max-h-screen'>
            <Aboutus/>
          </div>
          <div className='col-start-1 col-span-12 row-start-3 row-span-1  max-h-screen'>

          </div>
          <div className=' col-start-1 col-span-12 row-start-3 row-span-1  max-h-screen'>
            <img src={p2} className=' w-screen h-screen object-cover'/>
          </div>
          <div className='bg-gray-800/75 col-start-1 col-span-12 row-start-3 row-span-1'>   
          </div>
          <div className=' col-start-3 col-span-4 row-start-3 row-span-1 flex items-center max-h-screen'>
            <div className=''>
              <h1 className='text-gray-100 text-6xl mb-10 font-bold'>Ready To Train <br/><span className='text-red-400'>Your Body</span></h1>
              <p className='text-gray-100 mb-10 w-3/4'>Gym training is a structured and disciplined approach to physical exercise that focuses on strength, endurance and overall fitness improvement.</p>
              <Link to='/register' className='bg-red-400 text-gray-100 mr-5 py-3 px-10 rounded-lg text-center'>Start Now</Link>
              
            </div>
            
          </div>
          <div className=' col-start-7 col-span-3 row-start-3 row-span-1 flex items-center max-h-screen'>
            <div className='grid grid-cols-12 grid-rows-6'>
              <div className='border-2 border-red-700 w-80 h-80 col-start-4 col-span-3 row-start-1 row-span-4'></div>
              <div className='border-2 border-green-700 w-80 h-96 col-start-6 col-span-3 row-start-3 row-span-4'></div>
              <div className='col-start-5 col-span-3 row-start-2 row-span-4 w-80 h-80'>
                <img src={p3} className=''/>
              </div>
            </div>
          </div>
          <div className='col-start-2 col-span-10 row-start-4 row-span-1  max-h-screen mb-10'>
            <div className='flex flex-col items-center justify-center'>
              <h1 className='text-gray-100 text-6xl mb-10 font-bold text-center'>Our Amazing <br/><span className='text-red-700'>Products</span></h1>
              <p className='text-gray-100 mb-10 w-3/4'>Gym training is a structured and disciplined approach to physical exercise that focuses on strength, endurance and overall fitness improvement.</p>  
            </div>
            <div className='flex'>
            {  products.slice(0, 5).map((item)=>{
           return (
            <Productcard key={item.id} id={item.id} name={item.name} description={item.description} price={item.price} image={item.image} avg_rating={item.avg_rating} num_voters={item.num_voters} remove={remove}/>
       )
          })}
          </div>
          <div className='flex items-center justify-center'>
            <Link to='/products' className='bg-indigo-500 text-xl font-bold text-gray-100 mt-2 text-gray-100py-1 px-20 rounded-lg text-center'>All Products</Link> 
          </div>
          </div>
          <div className='col-start-1 col-span-12 row-start-5 row-end-auto  max-h-screen'>
            <Contact />
          </div>
          <div className='col-start-1 col-span-12 row-start-6 row-end-auto  max-h-screen'>
            <Footer/>
          </div>
            
          
  </div>
          
  )
}

export default Home