import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import './cart-icon.styles.scss';
import { useContext } from "react";import { cartDropdownContext } from "../../contexts/cart-dropdown.context.component";


const CartIcon = (cartClick)=> {
  const {isClickedDropdown,setIsClickedDropdown} = useContext(cartDropdownContext);
  const {cartCount} = useContext(cartDropdownContext);
    return(
        <div className="cart-icon-container" onClick={()=> setIsClickedDropdown(!isClickedDropdown)}>
           <ShoppingIcon className='shopping-icon'/>
           <span className="item-count">{cartCount}</span>
        </div>
    )
}

export default CartIcon;
