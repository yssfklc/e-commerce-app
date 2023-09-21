import React, { useEffect, useState } from 'react';
import './Home.css';
import { Provider, useSelector, useDispatch } from 'react-redux';
import {selectAllBasket, removeFromBasket, selectBasketPrice, removeAllFromBasket} from '../features/addBasketSlice';
import { isLoggedin, selectCurrentUser} from '../features/sessionSlice';
import { useNavigate } from 'react-router-dom';
import { Rating } from '@mui/material';
import {Link} from 'react-router-dom';
import Productcard from './Productcard';


function Basket() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const basket = useSelector(selectAllBasket);
  const totalPrice=useSelector(selectBasketPrice);
  const currentUserId=useSelector(selectCurrentUser);
  const date = new Date().toDateString()
  console.log(date);

  const removeElement=((e)=>{
    e.preventDefault();
    basket.map((item)=>{
      if(item.id==e.target.value){
        dispatch(removeFromBasket(item))
      }});
  })
  const createOrder =((e)=>{
    e.preventDefault();
    const product_id = (basket.map(item=>item.id));
    const order_obj={
      user_id:currentUserId.payload,
      product_id:product_id,
      date:date,
      price:totalPrice
    }
    const createOrder=async(order_obj)=>{
      try{
        const response = await fetch('http://localhost:8000/orders',{
          method:'POST',
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(order_obj),
        });
        if(response.ok){
          const data=await response.json();
          dispatch(removeAllFromBasket());
          navigate('/orders');
        }
      }catch(err){
        console.log(err)
      }
    }
    createOrder(order_obj);
  })
  
  
 
  
  
  useEffect( ()=>{
  }, [])
  
  return (
    <div className='flex items-start justify-center min-h-screen'>
          
          
            
            <div className='flex flex-wrap justify-center w-3/5 mb-10'>

            { basket.map((item)=>{
            return (
          //     <div className='card'>
          //     <Link to={`../products/${item.id}`} className='product-link'>
          //     <div >
          //       <img src={item.image} />
          //       <div className='flex-space-evenly'>
          //         <div className='item-head'>
          //           <h2>{item.name} <span>{item.description}</span></h2>
                    
          //         </div>
          //           <span className='rating-span'>
          //           <Rating name="read-only" value={item.avg_rating} readOnly className='rating'/>{item.num_voters}
          //           </span>
          //           <span className='price'>${item.price}</span>
          //       </div>
          //     </div>
          //       </Link>
          //   <button type='submit' value={item.id} onClick={(e)=>removeElement(e)} className='add-button'>Remove From Basket</button>
          // </div>
          <Productcard id={item.id} name={item.name} description={item.description} price={item.price} image={item.image} avg_rating={item.avg_rating} num_voters={item.num_voters} />
          )
            })}
            </div>

          
          <div className='bg-gray-300 flex flex-col justify-center sticky top-16 mt-1 w-80 py-10 px-8 rounded-lg border-2 border-indigo-500'>
          <div className='flex justify-between py-1 px-1 font-bold border-b-2'>
                  <p>Name</p>
                  <p>Price</p>
          </div>
            {basket.map((item)=>{
              return(
                <div className='flex justify-between py-1 px-1'>
                  <p>{item.name}</p>
                  <p>1 * <span className='font-bold'>$ {item.price}</span></p>
                  
                </div>
              )
            })}
            <div className='border-t-2 border-indigo-500 flex justify-between'><span className='font-bold '>Total price</span> : <span>$ {totalPrice}</span></div>
            <button type='submit' className='bg-indigo-500 rounded-lg mt-5 py-1 px-3' onClick={(e)=>createOrder(e)} >Create Order</button>
          </div>
    </div>
  )
}

export default Basket;