import React, { useEffect, useState } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import {selectAllBasket, removeFromBasket, selectBasketPrice, removeAllFromBasket} from '../features/addBasketSlice';
import { isLoggedin, selectCurrentUser} from '../features/sessionSlice';
import { useNavigate } from 'react-router-dom';
import Productcard from '../components/Productcard';


function Basket() {
  const [err, setErr]=useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const basket = useSelector(selectAllBasket);
  const totalPrice=useSelector(selectBasketPrice);
  const currentUserId=useSelector(selectCurrentUser);
  const date = new Date().toDateString()
  const remove={
    isempty:false,
    isRemove:true
  };

  const createOrder =((e)=>{
    e.preventDefault();
    if(isLoggedin && basket.length !== 0){

      const product_id = (basket.map(item=>item.id));
      const order_obj={
        user_id:currentUserId.payload,
        product_id:product_id,
        date:date,
        price:totalPrice
      }
      const createOrder=async(order_obj)=>{
        try{
          const response = await fetch('api/orders',{
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
    }else if(!isLoggedin){
      setErr('You need to login to create an order')
      return
      // navigate('/login');
    }else if(basket.length === 0){
      setErr('You need to add products to create an order')
      return
    }else{
      setErr('Something went wrong')
      return
    }
  })
  
  
 
  
  
  useEffect( ()=>{
  }, [])
  
  return (
    <div className='flex items-start justify-center min-h-screen max-md:flex-col'>
          
          
            
            <div className='flex flex-wrap justify-center w-3/5 mb-10 max-md:w-full max-md:mx-auto'>

            { basket.length===0?<p className='text-gray-100 md:hidden'> Add Products To See Here</p>:basket.map((item)=>{
            return (
          <Productcard id={item.id} name={item.name} description={item.description} price={item.price} image={item.image} avg_rating={item.avg_rating} num_voters={item.num_voters} remove={remove} />
          )
            })}
            </div>

          
          <div className='bg-gray-300 flex flex-col justify-center sticky top-16 mt-1 w-80 py-10 px-8 rounded-lg border-2 border-indigo-500 max-md:static max-sm:w-10/12 max-md:w-8/12 max-md:mx-auto' >
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
            <p className='text-red-700 text-sm'>{err?err:null}</p>
            <button type='submit' className='bg-indigo-500 rounded-lg mt-5 py-1 px-3' onClick={(e)=>createOrder(e)} >Create Order</button>
          </div>
    </div>
  )
}

export default Basket;