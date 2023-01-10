import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import updateCartItem from "../updateCartItem";
import axios, * as others from 'axios';


const CartItem = ({item}) => {

    const [cartItem, setCartItem] = useState(item);
    
    const updateCartItem =  (quantity) =>{
        axios.post (process.env.REACT_APP_URL+'/cart/update-quantity' , {
        item_id : cartItem.item_id , 
        quantity : cartItem.quantity+quantity , 
      }, 
      {headers : {
        authorization : localStorage.getItem('token')
      }}
      )
      .then( (res)=> {
      console.log("cart updated") ; 
      const s = JSON.stringify(cartItem);
      const itemDeepCopy = JSON.parse(s); 
      itemDeepCopy.quantity += quantity ; 
      setCartItem(itemDeepCopy)
    })
    .catch ( (err)=>  {
    console.log(err)}) 
    }
  const handleDelete = (e)=>{
    e.preventDefault();
    console.log(item) 
    console.log(cartItem.item_id)
    axios.post (process.env.REACT_APP_URL+'/cart/delete-item' , {
        item_id : cartItem.item_id , 
      }, 
      {headers : {
        authorization : localStorage.getItem('token')
      }}
      )
      .then( (res)=> {
      console.log("cart updated") ; 
      setCartItem(null)
    })
  }
  

  const handleAdd = (e)=>{
        console.log(e);
        e.preventDefault() ;
        updateCartItem(1); 
      

    }
    const handleRemove = (e)=>{
        e.preventDefault() ;
        updateCartItem(-1); 

    }


    return (  
        <div>
        {cartItem && <Product>
          <ProductDetail>
            <Image src= {`/images/${cartItem.image}`} />
            <Details>
              <ProductName>
                <b>Product:</b> {cartItem.name}
              </ProductName>
              <ProductId>
                <b>ID:</b> {cartItem.item_id}
              </ProductId>
              <ProductSize>
                <b>Descritption:</b> {cartItem.description}
              </ProductSize>
            </Details>
          </ProductDetail>
          <PriceDetail>
            <ProductAmountContainer>
              <Add onClick = {(e) => {
                handleAdd(e); 
              } } />
              <ProductAmount>{cartItem.quantity}</ProductAmount>
              <Remove onClick = {(e) => {
                handleRemove(e); 
              }}
              />
            </ProductAmountContainer>
            <ProductPrice> {cartItem.quantity * cartItem.price} EGP </ProductPrice>

            <Delete onClick={(e)=> handleDelete(e)}>Delete</Delete>
          </PriceDetail>
        </Product>
}
        <Hr />

        </div>
    );
}
 
export default CartItem;




const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;


const Delete = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;