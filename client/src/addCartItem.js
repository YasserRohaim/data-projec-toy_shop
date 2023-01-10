import axios, * as others from 'axios';

const addCartItem = (url , quantity , item_id) => {
  console.log(item_id)
  axios.post
  (process.env.REACT_APP_URL +'/cart/add-item' , {
    item_id : item_id , 
    quantity : quantity , 
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



export default addCartItem 