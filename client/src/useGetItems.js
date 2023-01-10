import { useEffect , useState } from "react";
const axios = require('axios').default;

const useGet = (url)=> {

    const [data , setData] = useState(null) ; 
    const [isLoading , setIsLoading] = useState(true); 
    const [error , setError] = useState(null) ; 
    
    useEffect(() => {
      if (localStorage.getItem("token")){
        axios.get(url).then( (response) => {
            setData(response.data); 
            setIsLoading(false); 
          }
        )
        .catch( (e)=> {
            setError(e.message); 
            setIsLoading(false); 
        } )
      }
    }, [url])

    return {data , isLoading , error} ; 
}
export default useGet