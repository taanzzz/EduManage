import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthProvider';


const Register = () => {
  const { register: registerUser, googleSignIn, loading, setLoading } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch('password');

  const onSubmit = (data) => {
    setRegisterError('');
    registerUser({ name: data.name, email: data.email, password: data.password })
      .then((result) => {
        toast.success(`Account created successfully! Welcome, ${data.name}!`);
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
        setRegisterError(err.message);
        setLoading(false);
      });
  };
  
    const handleGoogleSignIn = () => {
    setRegisterError('');
    googleSignIn()
      .then((result) => {
        toast.success(`Successfully signed in as ${result.user.displayName}!`);
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
        setRegisterError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-150px)] px-4 py-8">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h1 className="text-3xl font-bold text-center text-primary">Create Account</h1>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <span className="text-error text-xs mt-1">{errors.name.message}</span>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="your.email@example.com"
              className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Must be at least 6 characters"
              className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
            />
            {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Re-type your password"
              className={`input input-bordered ${errors.confirmPassword ? 'input-error' : ''}`}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
            />
            {errors.confirmPassword && <span className="text-error text-xs mt-1">{errors.confirmPassword.message}</span>}
          </div>

          {registerError && <p className="text-error text-center text-sm mt-2">{registerError}</p>}

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : 'Register'}
            </button>
          </div>

          <p className="text-center text-sm mt-4">
            Already have an account?{' '}
            <Link to="/login" className="link link-hover text-primary font-semibold">
              Login here
            </Link>
          </p>
          
          <div className="divider">OR</div>

          <button type="button" onClick={handleGoogleSignIn} className="btn btn-outline btn-primary" disabled={loading}>
            <FaGoogle />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;