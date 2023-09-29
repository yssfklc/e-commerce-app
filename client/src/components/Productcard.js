import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket } from '../features/addBasketSlice';
import {selectAllBasket, removeFromBasket, selectBasketPrice, removeAllFromBasket} from '../features/addBasketSlice';

function Productcard({id, name, description, price, image, avg_rating, num_voters, remove}) {
    const [products, setProducts]=useState([]);
    const dispatch = useDispatch();
    const basket = useSelector(selectAllBasket);
    const getProducts = async()=>{
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
    const handleBasket=(e)=>{
        e.preventDefault();
        products.map(item=>{
          
          if(item.id==e.target.value){
            let isInBasket=false;
            basket.forEach(bsk=>{
              if(bsk.id==item.id){
                isInBasket=true
              }
            })
            if(isInBasket){
            return; 
            }
            dispatch(addToBasket(item))
          }});
    }
    const removeElement=((e)=>{
      e.preventDefault();
      basket.map((item)=>{
        if(item.id==e.target.value){
          
          dispatch(removeFromBasket(item))
        }});
    })
    useEffect( ()=>{
        getProducts();
    }, [])
  return (
        <div className='border-2 border-red-700 bg-gray-700 flex flex-col justify-between rounded-lg mb-5 mr-5 max-md:mb-1 max-md:w-full'>
              <Link to={`../products/${id}`} className='product-link'>
                <div className='w-60 max-md:w-full max-md:flex'>
                  <img src={image} alt='' className='w-80 h-72 object-cover rounded-t-lg max-md:h-24 max-md:w-28 max-md:object-cover pr-2  ' />
                  <div className='text-gray-100 mt-5 max-md:h-24 max-md:m-0 max-md:border-l-2 max-md:border-gray-100 pl-2 '>
                    <div className='flex justify-between'>
                      <h2 className='font-bold'>{name} <span>{description}</span></h2>
                    </div>
                      <div className='text-gray-100 my-1 max-md:m-0'>
                      <Rating name="read-only" value={avg_rating} readOnly className='rating'/> {num_voters}
                      </div>
                    <span className='line-through'>$10 </span><span className='text-green-600 text-lg no-underline'>  ${price}</span>  
                  </div>
                </div>
              </Link>
              {remove.isempty?null:<div className=' flex items-end m-2 justify-center'>
                <button value={id} onClick={(e)=>{remove.isRemove?removeElement(e):handleBasket(e)}} className='bg-red-400 text-gray-100 py-1 px-10 rounded-lg text-center'>{remove.isRemove?'Remove From Basket':'Add To Basket'}</button>
              </div>}
        </div>
  )
}

export default Productcard