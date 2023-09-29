import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, selectAllBasket } from '../features/addBasketSlice';

function Product() {
    const {productId} = useParams();
    const [product, setProduct]= useState([]);
    const dispatch = useDispatch();
    const basket = useSelector(selectAllBasket);
    const navigate=useNavigate();
const getProductsById = async(productId)=>{
    try{
        const response = await fetch('/api/productsbyid',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                id: productId
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

const handleBasket=(e)=>{
    e.preventDefault();
    product.map(item=>{
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

useEffect(()=>{
    getProductsById(productId)
}, [])
  return (
    <div className=''>
      {product.map((item)=>{
        return(
        <div className='flex flex-col items-start justify-start ml-20 p-10 min-h-screen max-md:ml-2 max-md:p-5'>
            <button className='ml-6 mb-5 bg-indigo-400 rounded-lg py-1 px-3' onClick={() => navigate(-1)}>
                    Go Back
            </button>
            <div className='flex items-start justify-start max-md:flex-col'>
                <div className='px-5 max-md:w-full max-md:mb-3'>
                    <img src={item.image} className='rounded-md w-96 h-96 object-cover max-md:w-full'/>
                </div>
                <div className='w-96 max-md:w-full'>
                    <h2 className='text-gray-100 font-bold text-lg mb-3'>{item.name}</h2>
                     <Rating name="read-only" value={item.avg_rating} readOnly className=''/>
                    <p className='text-gray-100 mb-3 text-justify'>{item.long_description}</p>
                    <div className='flex justify-center items-center'>
                        <div className='rounded-xl border-2 border-indigo-500 mt-2'>
                            <span className='px-3 text-indigo-500'>${item.price}</span><button value={item.id} className='bg-indigo-400 p-3 rounded-lg' onClick={(e)=>handleBasket(e)}>SEPETE EKLE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    })}
    </div>
    
  )
}

export default Product