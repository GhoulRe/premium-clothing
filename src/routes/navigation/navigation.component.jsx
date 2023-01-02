import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';
import { useContext } from 'react';
import { userContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase.utils';
import CartIcon from '../../components/card-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { cartDropdownContext } from '../../contexts/cart-dropdown.context.component';

const Navigation = () => {
   const { currentUser} = useContext(userContext); //context says whenever value inside me changes rerender this component
   const {isClickedDropdown} = useContext(cartDropdownContext);

   return (
      <>
         <div className='navigation'>
            <Link className='logo-container' to='/'>
               <CrownLogo className='logo' />
            </Link>
            <div className='nav-links-container'>
               <Link className='nav-link' to='/shop'>
                  SHOP
               </Link>
               {
                  currentUser ? (
                     <span className='nav-link' onClick={signOutUser}>Sign Out</span>
                  ) : (
                     <Link className='nav-link' to='/auth'>
                        Sign-in
                     </Link>)
               }
               <CartIcon/>
            
            </div>
            {isClickedDropdown && <CartDropdown/>}
         </div>
         <Outlet />
      </>
   )
}

export default Navigation;