import './product-card.styles.scss';
import Button from '../button/button.component';
import { useContext } from 'react';
import { cartDropdownContext } from '../../contexts/cart-dropdown.context.component';

const ProductCard = ({products})=> {

    const {name,price,imageUrl} = products;
    const {addItemToCart} = useContext(cartDropdownContext);
    return(
       <div className='product-card-container'>
        <img src={imageUrl} alt={`${name}`}/>
        <div className='footer'>
           <span className='name'>{name}</span>
           <span className='price'>{price}</span>
        </div>
        <Button buttonType='inverted' onClick={()=> addItemToCart(products)}>ADD TO CART</Button>
       </div>
    )
}

export default ProductCard;