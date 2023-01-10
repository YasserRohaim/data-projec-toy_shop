import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import axios, * as others from 'axios';

const Register = () => {
    const [phoneNumber , SetPhoneNumber] = useState(''); 
    const [address , SetAddress] = useState(''); 
    const [orderPlaced , setOrderPlaced ] = useState(false)
    const [error , setError] = useState(null)
    const checkOut = (e) =>{ 
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_URL}/cart/place-order`, {
          phone: phoneNumber,
          address: address 
        } , 
        {headers : {
            authorization : localStorage.getItem('token')
          }}
        )
        .then( (res)=> setOrderPlaced(true))
        .then(
            axios.delete(`${process.env.REACT_APP_URL}/cart/clear-cart`, {headers : {
                authorization : localStorage.getItem('token')
            }})

        )
        .catch((e)=>(setError(e)) )
      }
    



    return (
    <Container>
      <Wrapper>
        { !orderPlaced &&        
        <div>
        <Title>Order Information</Title>
       
        <Form>
          <Input placeholder="phone number" 
          type = "phone-number"
          required 
          onChange={(e)=>SetPhoneNumber(e.target.value)}
          />
          <Input placeholder="address"
          type = "text"
          required 
          onChange={(e)=>SetAddress(e.target.value)} 
          />
          <Button onClick={(e)=> checkOut(e)} >Place Order</Button>
          
        </Form>
        </div>
        }
        {orderPlaced && <div>Thank you for your order</div>}
        {error && <div>OOps something went wrong</div> }

      </Wrapper>
    </Container>
  );
    }


    export default Register;




const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("/images/toys.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;