import './car-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { cartDropdownContext } from '../../contexts/cart-dropdown.context.component';
import { useNavigate } from 'react-router-dom';

const CartDropdown = ()=>{
  const {cartItems} = useContext(cartDropdownContext);
  const navigate =useNavigate();

  const handleClick = ()=>{
     navigate('/checkout');
  }
    return(
      <div className='cart-dropdown-container'>
        <div className='cart-items'>
          {cartItems.map((item)=>( <CartItem key={item.id} products={item}/> ))}
        </div>
        <Button onClick={handleClick}>GO TO CHECKOUT</Button>
      </div>
    )
}

export default CartDropdown;