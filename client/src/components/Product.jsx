import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { Link , useNavigate} from "react-router-dom";
import axios, * as others from 'axios';
import { useState } from "react";
// import addCartItem from "../addCartItem";


const Product = ({ item }) => {
  const navigate = useNavigate() ; 
  const [addQuantity , setAddQuantity] =useState(0) ; 
  const addtoCart = (event)=>{
    event.preventDefault();
    if(localStorage.getItem("token")){
    axios.post
    (process.env.REACT_APP_URL +'/cart/add-item' , {
      item_id : item.id , 
      quantity : 1 , 
    }, 
    {headers : {
      authorization : localStorage.getItem('token')
    }}
    )
    .then( (res)=> {
    console.log(res) ; 
  })
  .catch ( (err)=>  {
  console.log(err)})
    }
}


  return (
    <Link to = {`/product/${item.id}`} state ={item}>
    <Container>
      {/* <Link to = {`/product/${item.id}`}>
      </Link> */}

      <Circle />
      <Image src={"images/"+item.image}  />
      
      <Info>
        <Icon>
          <ShoppingCartOutlined onClick= {(e)=>(addtoCart(e))}/>
        </Icon>
        <Icon>
          <SearchOutlined />
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
     </Link>
  );
};

export default Product;




const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;