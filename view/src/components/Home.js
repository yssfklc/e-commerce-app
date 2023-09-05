import React, { useEffect, useState } from 'react';
import './Home.css';
import banner1 from '../img/banner1.svg';
import banner2 from '../img/banner2.svg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../features/addBasketSlice';

function Home() {
  const [products, setProducts]=useState([]);
  const dispatch = useDispatch();

  // queries start
  const getOrder = async()=>{
    try{
      const response = await fetch('http://localhost:8000/products')
      if(response.ok){
        const result = await response.json();
        setProducts(result);
        console.log(await products);
      }
    }catch(error){
      console.log(error);
    }
     
  };

  // queries ends
  const handleBasket=(e)=>{
    e.preventDefault();
    products.map(item=>{
      if(item.id==e.target.value){
        dispatch(addToBasket(item))
      }});

  }
  
  useEffect( ()=>{
     getOrder()
  }, [])
  
  return (
    <div className='my-list-container'>
          <img src={banner1} className='banner1'/>
          <img src={banner2} className='banner2'/>
          <h2>Product List</h2> 
          
          <div className='my-list'>
            
          {  products.slice(0, 5).map((item)=>{
           return (<div className='card' >
           <img src={item.image} />
           <div className='flex-space-evenly'>
             <Link to={`${item.id}`} className='product-link'>
               <h2>{item.name}</h2>
             </Link>
             <span>${item.price}</span>
           </div>
           <p>{item.description}</p>
         <button type='submit' value={item.id} onClick={(e)=>handleBasket(e)} >Add To Basket</button>
            </div>)
          })}
          </div>
          <Link to='/products' className='all-products'>All Products</Link>
       
          {/* <button type='submit' onClick={(e)=>submitList(e)} >Save My List</button> */}
    </div>
  )
}

export default Home