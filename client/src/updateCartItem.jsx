import axios, * as others from 'axios';

const updateCartItem= (item_id , quantity)=> {
    axios.post
    (`${process.env.URL}/cart/update-quantity` , {
      item_id : item_id , 
      quantity : quantity , 
    }, 
    {headers : {
      authorization : localStorage.getItem('token')
    }}
    )
    .then( (res)=> {
    console.log(res) ; 
    return res 
  })
  .catch ( (err)=>  {
  console.log(err)})   
}   

export default updateCartItem