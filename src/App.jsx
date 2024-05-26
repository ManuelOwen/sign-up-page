import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import './style.css';

function App() {
  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <>
      <div className='container'>
        <header className='header'> 
          <h1>LOGIN</h1>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register("name")} placeholder='Enter your name' />
          <p>{errors.name?.message}</p>
        
          <input type="text" {...register("email")} placeholder='Enter your email' />
          <p>{errors.email?.message}</p>
          <input type="password" {...register("password")} placeholder='Enter your password' />
          <p>{errors.password?.message}</p>
          <input type="password" {...register("confirmPassword")} placeholder='Confirm password' />
          <p>{errors.confirmPassword?.message}</p>
          <button type='submit'>Sign up</button>
        </form>
        <p>Have an account? Login</p>
      </div>
    </>
  );
}

export default App;
