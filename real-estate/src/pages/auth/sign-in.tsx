// components/SignIn.tsx
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import styles from '../../styles/signUp.module.css'; // Import CSS module
import Link from 'next/link';

interface Errors {
  email?: string;
  password?: string;
}

const SignIn= () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});
  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
      if (!validateEmail(value)) {
        setErrors((prev) => ({ ...prev, email: 'Invalid email address' }));
      } else {
        setErrors((prev) => ({ ...prev, email: '' }));
      }
    } else if (name === 'password') {
      setPassword(value);
      if (value.length < 6) {
        setErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters' }));
      } else {
        setErrors((prev) => ({ ...prev, password: '' }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (errors.email || errors.password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fix the errors before submitting!',
      });
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_USER_SIGNIN_URL}`, { email, password });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Logged in successfully!',
      });
      console.log('User token:', response.data.token);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem("userId", response.data.user._id);
      router.push('/');
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.msg || 'Something went wrong. Please try again.',
      });
      console.log('Error:', error);
    }
  };

  return (
      <section className={`d-flex justify-content-center align-content-center w-100 ${styles.container}`}>
        <div className={`form-container mt-5 ${styles.formContainer}`}>
          <p className={styles.title}>Sign In</p>
          <p className={styles.subTitle}>Welcome back! Please log in to your account.</p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input 
              type="email" 
              className={styles.input} 
              placeholder="Email" 
              name="email"
              value={email} 
              onChange={handleChange} 
            />
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
            
            <input 
              type="password" 
              className={styles.input} 
              placeholder="Password" 
              name="password"
              value={password} 
              onChange={handleChange} 
            />
            {errors.password && <p className={styles.errorText}>{errors.password}</p>}
            
            <button className={styles.formBtn}>Login</button>
          </form>
          <p className={styles.signUpLabel}>
            Don’t have an account? <span className={styles.signUpLink}> <Link href="/auth/sign-up">Sign Up</Link> </span>
          </p>
        </div>
      </section>
  );
};

export default SignIn;
