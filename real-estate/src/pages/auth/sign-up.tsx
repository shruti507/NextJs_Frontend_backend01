import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import styles from '../../styles/signUp.module.css'; // Import scoped styles for this component
import Link from 'next/link';

interface Errors {
  name?: string;
  email?: string;
  password?: string;
}

const SignUp = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});

  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'name') {
      setName(value);
      setErrors((prev) => ({
        ...prev,
        name: value.trim() === '' ? 'Name is required' : '',
      }));
    } else if (name === 'email') {
      setEmail(value);
      setErrors((prev) => ({
        ...prev,
        email: !validateEmail(value) ? 'Invalid email address' : '',
      }));
    } else if (name === 'password') {
      setPassword(value);
      setErrors((prev) => ({
        ...prev,
        password: value.length < 6 ? 'Password must be at least 6 characters' : '',
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password || errors.name || errors.email || errors.password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out all fields correctly!',
      });
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_USER_REGISTER_URL}`, { name, email, password });
      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem('token', response.data.token);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Account created successfully!',
      });
      router.push('/');
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.msg || 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <section className={`d-flex justify-content-center align-content-center w-100 ${styles.container}`}>
      <div className={`form-container mt-5 ${styles.formContainer}`}>
        <p className={styles.title}>Create account</p>
        <p className={styles.subTitle}>Lets get started with your 30 days free trial</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="Name" 
            name="name"
            value={name} 
            onChange={handleChange} 
          />
          {errors.name && <p className={styles.errorText}>{errors.name}</p>}
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
          <button className={styles.formBtn}>Create account</button>
        </form>
        <p className={styles.signUpLabel}>
          Already have an account? <span className={styles.signUpLink}> <Link href="/auth/sign-in">Login</Link> </span>
        </p>
        
      </div>
    </section>
  );
};

export default SignUp;
