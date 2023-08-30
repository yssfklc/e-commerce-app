import React, { useEffect, useState } from 'react';
import './Home.css';

function Home() {
  const [products, setProducts]=useState([]);
  const [filteredproducts, setFilteredproducts]=useState([]);
  const [chart, setChart]=useState([]);
  const [searchquery, setSearchquery]=useState('');
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
  const handleSearch=(e)=>{
    e.preventDefault();
    setFilteredproducts(products.filter((item)=>item.name.toLowerCase().includes(searchquery.toLowerCase())));
  }
  const filterProducts = () =>{

  }
  
  useEffect( ()=>{
     getOrder()
  }, [])
  
  return (
    <div className='my-list-container'>
          <h2>Product List</h2> 
          <form className='search-form'>
            <input onChange={e=>setSearchquery(e.target.value)}/>
            <button onClick={e=>handleSearch(e)}>Search</button>
          </form>
          <div className='my-list'>
            
          { searchquery==''? products.map((item)=>{
           return (<div className='card' >
               <img src="https://picsum.photos/200"/>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <button type='submit' value={chart} onClick={(e)=>setChart(e.target.value)} >Add To Basket</button>
            </div>)
          }):filteredproducts.map((item)=>{
            return (<div className='card' >
                <img src="https://picsum.photos/200"/>
               <h2>{item.name}</h2>
               <p>{item.description}</p>
               <button type='submit' value={chart} onClick={(e)=>setChart(e.target.value)} >Add To Basket</button>
             </div>)
           })}
          </div>
       
          {/* <button type='submit' onClick={(e)=>submitList(e)} >Save My List</button> */}
    </div>
  )
}

export default Home