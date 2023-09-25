import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToBasket } from '../features/addBasketSlice';
import { selectAllProducts, loadAllProducts } from '../features/addProductSlice';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Productcard from '../components/Productcard';
import Footer from '../components/Footer';
import Aboutus from '../components/Aboutus';
import Contact from '../components/Contact';



function Products() {
//   const [products, setProducts]=useState([]);
  const [filteredproducts, setFilteredproducts]=useState([]);
  const [chart, setChart]=useState([]);
  const [searchquery, setSearchquery]=useState('');
  const dispatch = useDispatch();
  const temporary = useSelector(selectAllProducts);
  const products = [];
  // const isLogin=useSelector(isLoggedin);
  const remove={
    isempty:false,
    isRemove:false
  };

  
  
  // queries start
    console.log('lale');
    temporary.map(item=>{
      let count=0;
      products.map(product=>{
        if(product.id===item.id){
          count++
        }
      })
      if(count===0){
        products.push(item);
      }
    })

  
  const handleSearch=(e)=>{
    e.preventDefault();
    setSearchquery(e.target.value)
    setFilteredproducts(products.filter((item)=>item.name.toLowerCase().includes(searchquery.toLowerCase())));
  }
  
const handleBasket=(e)=>{
    e.preventDefault();
    products.map(item=>{
      if(item.id==e.target.value){
        dispatch(addToBasket(item))
      }});

  }
  
  useEffect( ()=>{
    dispatch(loadAllProducts());
  }, [])
  
  return (
    <div className=''>
      <div className='flex items-end justify-center m-10'>
            <h2 className='text-gray-100 text-6xl font-bold mr-10  '>Ready To <span className='text-red-700'>Start?</span></h2> 
      </div>
      <div className='flex justify-center mb-5'>
            <form className='w-4/5 flex justify-center'  >
              <input onChange={e=>handleSearch(e)} className='bg-gray-100 rounded-l-lg w-2/4 h-10 ' placeholder='Type To Search A Product'/>
              <button className='bg-gray-100 py-2 h-10 items-center px-5 rounded-r-lg'>Ara</button>
            </form>
      </div>
      <div className='flex flex-col items-center '>
            
            <div className='flex flex-wrap justify-center w-4/5 mb-10'>
            { searchquery===''? products.map((item)=>{
            return (
                <Productcard id={item.id} name={item.name} description={item.description} price={item.price} image={item.image} avg_rating={item.avg_rating} num_voters={item.num_voters} remove={remove} />
              )
            }):filteredproducts.map((item)=>{
              return (
                <Productcard id={item.id} name={item.name} description={item.description} price={item.price} image={item.image} avg_rating={item.avg_rating} num_voters={item.num_voters} remove={remove}/>
              )
            })}
            </div>
            <Aboutus/>
            <Contact/>
            <Footer/>
      </div>

    </div>
  )
}

export default Products;