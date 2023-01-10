import React, { useEffect } from "react";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import { useState } from "react";
import useGet from "../useGetItems";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import axios, * as others from 'axios';


const Home = () => {
  const [products , setProducts] = useState(null) ; 
  const [isLoading , setIsLoading] = useState(false); 
  const [error , SetError] = useState(null); 

  const url = process.env.REACT_APP_URL+'/items'
  useEffect(() => {
    console.log(url)
      axios.get(url).then( (response) => {
        setProducts(response.data); 
          setIsLoading(false); 
        }
      )
      .catch( (e)=> {
         SetError(e.message); 
         console.log(e); 
          setIsLoading(false); 
      } )
  }, [])



  const [searchName , setSearchName ] = useState(null);
  const [brand , setBrand] = useState(null);
  const [minPrice , setMinPrice] = useState(0);
  const [maxPrice , setMaxPrice] = useState(null); 
  

  const handleSearch = (event)=> {
    event.preventDefault() 
    axios.get(process.env.REACT_APP_URL+"/items/search" ,{ params: { name: searchName , min : minPrice, max: maxPrice , brand: brand  } } )
    .then((res)=>{
      console.log(res.data)
      setProducts(res.data)
    })


  }

  return (
    <div>
      <Announcement />
      <Navbar />      
      <SearchContainer>
        <Input placeholder="name" 
        onChange = {
          (e) => {setSearchName(e.target.value) ; }
        } > 
      </Input>

        <Input placeholder="brand" 
            type="text"
            onChange = {
              (e) => {setBrand(e.target.value) ; }
            } > 
      </Input>

      <Input placeholder="min price" 
            type="text"
            onChange = {
              (e) => {setMinPrice(e.target.value) ; }
            } > 
      </Input>

      <Input placeholder="max price " 
            type="text"
            onChange = {
              (e) => {setMaxPrice(e.target.value) ; }
            } > 
      </Input>
      <div       onClick = { (e) => {handleSearch(e)} }>
      <Search style={{ color: "gray", fontSize: 22 }} 
      />
      </div>

      </SearchContainer>



    
      {products && <Products products = {products} />}
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;




const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  height: 30px
`;

const Input = styled.input`
  height: 20px; 
  border: none;
  ${mobile({ width: "50px" })}
`;