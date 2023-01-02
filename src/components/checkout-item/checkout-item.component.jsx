import { useContext } from 'react';
import { cartDropdownContext } from '../../contexts/cart-dropdown.context.component';
import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem})=> {
const {name,imageUrl,price,quantity} = cartItem;
const {clearItemFromCart, addItemToCart, removeItemCart} = useContext(cartDropdownContext);

const clearCart = ()=> clearItemFromCart(cartItem);
const removeItemHandler = () => removeItemCart(cartItem);
const addItemHandler = () => addItemToCart(cartItem);
return(
    <div className='checkout-item-container'>
        <div className='image-container'>
            <img src={imageUrl}  alt={`${name}`} />
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>
           <div className='arrow' onClick={removeItemHandler}>
               &#10094;
           </div>
          <span className='value'>{quantity}</span>
            <div className='arrow' onClick={addItemHandler}>
            &#10095;
            </div>
 
        </span>
        <span className='price'>{price}</span>
        <div className='remove-button' onClick={clearCart}>&#10005;</div>
    </div>
)
}

export default CheckoutItem;