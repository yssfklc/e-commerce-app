import React, { useEffect, useState } from 'react';
import './Home.css';
import banner1 from '../img/banner1.svg';
import banner2 from '../img/banner2.svg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../features/addBasketSlice';
import {getUser} from '../requests/requests';
import Rating from '@mui/material/Rating';


function Home() {
  const [products, setProducts]=useState([]);
  const dispatch = useDispatch();

  // queries start
  // const getUser=async()=>{
  //   try{
  //     const response = await fetch('http://localhost:8000/home')
  //     if(response.ok){
  //       const result = await response.json();
  //       dispatch(login(result.user));
  //     }
  //   }catch(error){
  //     console.log(error);
  //   }
  // };

  const getOrder = async()=>{
    try{
      const response = await fetch('http://localhost:8000/products')
      if(response.ok){
        const result = await response.json();
        setProducts(result);
      }
    }catch(error){
      console.log(error);
    }
     
  };
  getUser();
  // queries ends
  const handleBasket=(e)=>{
    e.preventDefault();
    products.map(item=>{
      if(item.id==e.target.value){
        dispatch(addToBasket(item))
      }});

  }
  
  useEffect( ()=>{
     getOrder();
     getUser();
  }, [])
  
  return (
    <div className='my-list-container'>
          <img src={banner1} className='banner1'/>
          <img src={banner2} className='banner2'/>
          <h2>Product List</h2> 
          
          <div className='my-list'>
            
          {  products.slice(0, 5).map((item)=>{
           return (<div className='card'>
           <Link to={`../products/${item.id}`} className='product-link'>
           <div >
             <img src={item.image} />
             <div className='flex-space-evenly'>
               <div className='item-head'>
                 <h2>{item.name} <span>{item.description}</span></h2>
                 
               </div>
                 <span className='rating-span'>
                 <Rating name="read-only" value={item.avg_rating} readOnly className='rating'/>{item.num_voters}
                 </span>
                 <span className='price'>${item.price}</span>
             </div>
           </div>
             </Link>
         <button type='submit' value={item.id} onClick={(e)=>handleBasket(e)} className='add-button'>Add To Basket</button>
       </div>)
          })}
          </div>
          <Link to='/products' className='all-products'>All Products</Link>
       
          {/* <button type='submit' onClick={(e)=>submitList(e)} >Save My List</button> */}
    </div>
  )
}

export default Home