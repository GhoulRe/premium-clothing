import { useState } from "react";
import { createAuthuserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase.utils";
import FormInput from "../form-input/form-input.components";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '' 
}

const SignUpForm = ()=> {
    
    const [formFeilds,setFormFeilds] = useState(defaultFormFields);
    const {displayName,email,password,confirmPassword} = formFeilds;


    const handleChange = (event) => {
       const {name,value} = event.target;
       setFormFeilds({...formFeilds,[name]: value})
    }

    const clearInput = ()=>{
        setFormFeilds(defaultFormFields);
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        if(password !== confirmPassword){
           alert('password does not match');
           return;
        }
        try {
            const {user} = await createAuthuserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user,{displayName});
            clearInput();
        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('cannot create user,email already in use');
            }else{
            console.log('user created encounter ',error)
            }
        }    
           
    }

    
    return(
        <div className="sign-up-container">
        <h2>Don't have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput 
                label='Display Name'
                type='text' 
                required 
                name="displayName" 
                value={displayName} 
                onChange={handleChange}
                />

                <FormInput 
                label='Email'
                type='email' 
                required 
                name="email" 
                value={email} 
                onChange={handleChange}
                />

                <FormInput
                label='Password' 
                type="password" 
                required 
                name="password" 
                value={password} 
                onChange={handleChange}
                />

                <FormInput
                label='Confirm Password' 
                type="password" 
                required 
                name="confirmPassword" 
                value={confirmPassword} 
                onChange={handleChange}
                />

                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;