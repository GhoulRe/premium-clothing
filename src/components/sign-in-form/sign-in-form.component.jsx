import './sign-in-form.styles.scss';
import FormInput from '../form-input/form-input.components';
import { useState } from 'react';
import Button from '../button/button.component';
import {signInAuthUserWithEmailAndPassword,signInWithGooglePopup} from '../../utils/firebase.utils';


const defaultSignInFeilds = {
    email: '',
    password: '',
}

const SignInForm = ()=>{
    
    const [formFeildsSignIn, setFormFeildsSignIn] = useState(defaultSignInFeilds);
    const {email,password} = formFeildsSignIn;

    const signInWithGoogle = async()=>{
        await signInWithGooglePopup();
    };

    const resetFormFields = ()=>{
        setFormFeildsSignIn(defaultSignInFeilds);
    }

    const handleChange = (event)=>{
         const {name, value} = event.target;
         setFormFeildsSignIn({...formFeildsSignIn, [name]: value});
    }

    const handleSubmit = async(event) =>{
      event.preventDefault();
      try {
        const {user} = await signInAuthUserWithEmailAndPassword(email,password);
        
        resetFormFields();
      } catch (error) {
        switch(error.code){
          case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
          case 'auth/user-not-found':
            alert('no user associated with this email');
          break;
          default:
          console.log(error)
        }
      }
      
        
    }
    return(
        <div className='sign-up-container'>
             <h2>Already have an account</h2>
             <span>Sign in with your email and password</span>
             <form onSubmit={handleSubmit}>
            <FormInput required label='Email' type='email' name='email' value={email} onChange={handleChange}/>
            <FormInput required label='Password' type='password' name='password' value={password} onChange={handleChange}/>
            <div className='buttons-container'>
            <Button type='submit'>SIGN IN</Button>
            <Button type="button" onClick={signInWithGoogle}
            buttonType="google">GOOGLE SIGN IN</Button>
            </div>
            </form>
        </div>              
    )
}

export default SignInForm;