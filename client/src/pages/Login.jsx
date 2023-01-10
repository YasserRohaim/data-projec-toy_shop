import styled from "styled-components";
import {mobile} from "../responsive";
import { useState } from "react";
import {Link , redirect ,useNavigate} from "react-router-dom" 
import Axios from "axios"



const Login = () => {
  const [handle , setHandle] = useState(''); 
  const [password , setPassword ] = useState(''); 
  const navigate = useNavigate();


  const handleSubmit = (e) =>{ 
    e.preventDefault();
    Axios.post(process.env.REACT_APP_URL+'/users/signin', {
      login_name: handle,
      password: password
    })
    .then(function (response) {
      console.log(response)
      if (response.status == 200){
        localStorage.setItem('token', response.data.auth_token);
        console.log(localStorage.getItem('token'));
        navigate("/");
      }
    })
  }

 
 return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="username/email" 
          type="text"
          required 
          onChange = {
            (e) => {setHandle(e.target.value)
            }
           }
          />
          <Input placeholder="password" 
            type="password"
            required 
            onChange = {
              (e) => {setPassword(e.target.value) ; }
            }
            />
          <Button onClick = {(e)=> handleSubmit(e)}>LOGIN
          </Button>

          <Link to="/register">
            CREATE A NEW ACCOUNT
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );

};  

export default Login;




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
  width: 25%;
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
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
