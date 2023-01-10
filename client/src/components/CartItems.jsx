import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import CartItem from "./CartItem";

const CartItems = ({cart_items}) => {
  return ( 
        <Info>
      {
      cart_items.items.map((item) => (
        <CartItem item={item} key={item.id} />
      ))}       
      </Info>
     );
    }

export default CartItems;





const Info = styled.div`
  flex: 3;
`;
