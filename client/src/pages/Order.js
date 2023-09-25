import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { Rating } from '@mui/material';
import {Link} from 'react-router-dom';
import Productcard from '../components/Productcard';

export default function Order() {
const {orderId} = useParams();
const [product, setProduct]= useState([]);
const remove={
    isempty:true,
    isRemove:false
  };

const getOrdersById = async(orderId)=>{
    try{
        const response = await fetch('http://localhost:8000/ordersbyid',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                id: orderId
            })
        }
        )
        if(response.ok){
            const data = await response.json();
            setProduct(data);
        }
    }catch(error){
        console.log(error);
    }
}


useEffect(()=>{
 getOrdersById(orderId)
}, [])
  return (
    <div className='flex flex-col items-center justify-start min-h-screen'>
        <div className=''>
          <h2 className='text-gray-100 text-4xl font-bold mr-10 mb-3'>Order Details</h2>   
        </div>    
          <div className='flex flex-wrap justify-center w-3/5 mb-10'>
          { product.map((item)=>{
           return (
      //      <div className='card'>
      //      <Link to={`../../products/${item.id}`} className='product-link'>
      //      <div >
      //        <img src={item.image} />
      //        <div className='flex-space-evenly'>
      //          <div className='item-head'>
      //            <h2>{item.name} <span>{item.description}</span></h2>
                 
      //          </div>
      //            <span className='rating-span'>
      //            <Rating name="read-only" value={item.avg_rating} readOnly className='rating'/>{item.num_voters}
      //            </span>
      //            <span className='price'>${item.price}</span>
      //        </div>
      //      </div>
      //        </Link>
      //  </div>
            <Productcard id={item.id} name={item.name} description={item.description} price={item.price} image={item.image} avg_rating={item.avg_rating} num_voters={item.num_voters} remove={remove}/>

       )
          })}
          </div>
        
    </div>
  )
}
